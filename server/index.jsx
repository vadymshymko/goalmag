import Express from 'express';
import Compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { matchPath, StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import AppContainer from 'containers/AppContainer';

import rootReducer from 'reducers';
import composeEnhancers from 'composeEnhancers';
import routes from 'routes';

import {
  fetchCompetitions,
  fetchTeam,
  fetchSquad,
} from 'actions';

import stats from '../dist/react-loadable.json';

const app = new Express();
const port = process.env.PORT || 8080;
const compression = new Compression();

const HTML = ({
  title = '',
  meta = '',
  innerHTML = '',
  preloadedState = {},
  styles = [],
  scripts = [],
}) => (`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      ${title}
      ${meta}

      ${styles.map(style => `<link href="/dist/${style.file}" rel="stylesheet"/>`.join('\n'))}

      <link href="/bundle.css" rel="stylesheet" />
      <link href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#28a745">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" content="/mstile-144x144.png">
      <meta name="theme-color" content="#ffffff">
    </head>
    <body>
      <div class="root" id="root">${innerHTML}</div>

      <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
      <script src="/manifest.js" async></script>
      ${scripts.map(script => `<script src="/${script.file}" async></script>`).join('\n')}
      <script src="/main.js" async defer></script>
    </body>
  </html>
  `);

const sendResponse = ({
  store,
  location,
  context,
  res,
}) => {
  const modules = [];

  const innerHTML = renderToString((
    <Provider store={store}>
      <StaticRouter
        location={location}
        context={context}
      >
        <Loadable.Capture
          report={moduleName => modules.push(moduleName)}
        >
          <AppContainer />
        </Loadable.Capture>
      </StaticRouter>
    </Provider>
  ));

  const helmet = Helmet.renderStatic();
  const bundles = getBundles(stats, modules);
  const styles = bundles.filter(bundle => (
    bundle.file.endsWith('.css')
  ));
  const scripts = bundles.filter(bundle => (
    bundle.file.endsWith('.js')
  ));


  res.send(HTML({
    innerHTML,
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    preloadedState: store.getState(),
    styles,
    scripts,
  }));
};

const handleRequest = (req, res) => {
  const location = req.url;
  const requestPath = req.path;
  const isNotHTTPS = req.header('x-forwarded-proto') && (req.header('x-forwarded-proto') !== 'https');

  if (isNotHTTPS) {
    res.redirect(301, `https://${req.header('host')}${requestPath === '/'
      ? '/match-center'
      : location
    }`);
  } else if (requestPath === '/') {
    res.redirect(301, '/match-center');
  } else {
    const store = createStore(rootReducer, composeEnhancers());
    const context = {};

    const activeRoute = routes.find(route => (
      matchPath(requestPath, route)
    ));
    const params = activeRoute
      ? matchPath(requestPath, activeRoute).params || {}
      : {};

    const promises = [
      store.dispatch(fetchCompetitions()),
      ...(
        activeRoute && activeRoute.path === '/team/:id' && params.id
          ? [
            store.dispatch(fetchTeam(params.id)),
            store.dispatch(fetchSquad(params.id)),
          ]
          : []
      ),
    ];

    Promise.all(promises).then(() => {
      sendResponse({
        store,
        location,
        context,
        res,
      });
    }).catch(() => {
      sendResponse({
        store,
        location,
        context,
        res,
      });
    });
  }
};

app.use(compression);
app.use(Express.static('dist/assets'));
app.use(handleRequest);

Loadable.preloadAll().then(() => {
  app.listen(port);
});
