import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchPath, StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import { camelizeKeys } from 'humps';
import StyleContext from 'context/StyleContext';

import configureStore from 'store';
import { fetchCompetitions } from 'actions';
import routes from 'routes';
import App from 'components/App';

import cacheService from './cacheService';

const isProd = process.env.NODE_ENV === 'production';
const chunkStatsFile = path.resolve('dist/assets/loadable-stats.json');

const getPromises = (store, req) => (
  [store.dispatch(fetchCompetitions()), ...routes.map((route) => {
    const match = matchPath(req.path, {
      ...route,
      path: route.path,
    });

    if (match && route.props && route.props.fetchData) {
      return route.props.fetchData(store.dispatch, {
        ...camelizeKeys(req.query || {}),
        ...(match.params || {}),
      });
    }

    return Promise.resolve(null);
  })]
);

const getAppHTML = ({
  store,
  chunkExtractor,
  stylesContext,
  routerURL,
  routerContext,
}) =>
  renderToString(chunkExtractor.collectChunks((
    <Provider store={store}>
      <StaticRouter
        location={routerURL}
        context={routerContext}
      >
        <StyleContext context={stylesContext}>
          <App />
        </StyleContext>
      </StaticRouter>
    </Provider>
  )));

const getResponse = async (req, res) => {
  try {
    const store = configureStore();
    const chunkExtractor = new ChunkExtractor({ statsFile: chunkStatsFile });
    const routerContext = {};
    const css = new Set();
    const stylesContext = {
        insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())),//eslint-disable-line
    };

    await Promise.all(getPromises(store, req));

    const appHTML = getAppHTML({
      store,
      chunkExtractor,
      routerURL: req.url,
      routerContext,
      stylesContext,
    });

    const helmet = Helmet.renderStatic();
    const responseState = {
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      styleTags: [...css].join(''),
      prefetchLinks: chunkExtractor.getLinkTags(),
      appHTML,
      state: serialize(store.getState()),
      scriptTags: chunkExtractor.getScriptTags(),
      status: routerContext.status || 200,
    };

    if (isProd) {
      cacheService.set(`page${req.path}`, responseState);
    }

    return res.status(responseState.status).render('index', responseState);
  } catch (error) {
    return res.set('Cache-Control', 'no-cache').status(500).send('Internal Server Error');
  }
};

export default getResponse;
