import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchPath, StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { parse } from 'query-string';
import NodeCache from 'node-cache';
import serialize from 'serialize-javascript';

import configureStore from 'store';

import StylesProvider from 'contextProviders/StylesProvider';

import App from 'components/App';
import MatchCenterPageContainer from 'containers/MatchCenterPageContainer';
import CompetitionPageContainer from 'containers/CompetitionPageContainer';
import TeamPageContainer from 'containers/TeamPageContainer';
import NotFoundPage from 'components/NotFoundPage';

import getRoutes from 'routes';

import { fetchCompetitions } from 'actions';

import stats from '../../dist/react-loadable.json';

const app = express();
const port = process.env.PORT || 8080;

const routes = getRoutes({
  MatchCenterPage: MatchCenterPageContainer,
  CompetitionPage: CompetitionPageContainer,
  TeamPage: TeamPageContainer,
  NotFoundPage,
});

const cacheService = (ttlSeconds => (
  new NodeCache({
    stdTTL: ttlSeconds,
    checkperiod: ttlSeconds * 0.2,
    useClones: false,
  })
))(600);

const redirectMiddleware = (req, res, next) => {
  const location = req.url;
  const requestPath = req.path;
  const isNotHTTPS = req.header('x-forwarded-proto') && (req.header('x-forwarded-proto') !== 'https');

  if (isNotHTTPS) {
    return res.redirect(301, `https://${req.header('host')}${requestPath === '/'
      ? '/match-center'
      : location
    }`);
  } else if (requestPath === '/') {
    return res.redirect(301, '/match-center');
  }

  return next();
};

const cacheMiddleware = (req, res, next) => {
  try {
    const cachedResponse = cacheService.get(`page${req.path}`, true);
    return res.render('index', cachedResponse);
  } catch (e) {
    return next();
  }
};

const getResponse = async (req) => {
  const store = configureStore();
  const context = {};
  const modules = [];
  const location = req.url;

  const css = new Set();
  const stylesContext = {
    insertCss: (...styles) => (
      styles.forEach(style => (
        /* eslint-disable */
          css.add(style._getCss())
          /* eslint-enable */
      ))
    ),
  };

  await store.dispatch(fetchCompetitions());

  const promises = routes.reduce((result, route) => {
    const match = matchPath(req.path, route);
    const routeComponent = route.component;
    const routeFetchData = routeComponent.fetchData;

    if (!match || !routeComponent || !routeFetchData) {
      return result;
    }

    return [
      ...result,
      routeFetchData(store.dispatch, match.params, parse(req.query || '')),
    ];
  }, []);

  await Promise.all(promises);

  const html = renderToString((
    <Loadable.Capture
      report={moduleName => (
        modules.push(moduleName)
      )}
    >
      <Provider store={store}>
        <StaticRouter
          location={location}
          context={context}
        >
          <StylesProvider context={stylesContext}>
            <App />
          </StylesProvider>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  ));

  const helmet = Helmet.renderStatic();
  const bundles = getBundles(stats, modules);

  const title = helmet.title.toString();
  const meta = helmet.meta.toString();

  const scripts = bundles.filter(bundle => (
    bundle.file.endsWith('.js')
  )).map(script => (
    `<script src="/${script.file}" async></script>`
  )).join('\n');

  return {
    title,
    meta,
    html,
    scripts,
    state: serialize(store.getState()),
    criticalCSS: [...css].join(''),
  };
};

const handleRequest = async (req, res, next) => {
  try {
    const response = await getResponse(req);
    cacheService.set(`page${req.path}`, response);

    return res.render('index', response);
  } catch (e) {
    console.log(e.message); // eslint-disable-line
    res.status(500).send('Internal server error');
    return next();
  }
};

app.use(compression());
app.use(express.static('dist/assets'));

app.set('views', 'dist/views');
app.set('view engine', 'pug');

app.get('*', redirectMiddleware);
app.get('*', cacheMiddleware);
app.get('*', handleRequest);

Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.log(`app listening on port: ${port}`); // eslint-disable-line
  });
});
