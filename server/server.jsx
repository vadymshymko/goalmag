import Express from 'express';
import Compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { matchPath } from 'react-router-dom';
import Helmet from 'react-helmet';

import rootReducer from 'reducers';
import composeEnhancers from 'composeEnhancers';
import routes from 'routes';

import {
  fetchCompetitions,
  fetchTeam,
  fetchSquad,
} from 'actions';

import InitialComponent from './InitialComponent';
import renderHTML from './html';

const app = new Express();
const port = process.env.PORT || 8080;
const compression = new Compression();

const handleRequest = (req, res) => {
  const location = req.url;

  if (req.header('x-forwarded-proto') && (req.header('x-forwarded-proto') !== 'https')) {
    res.redirect(`https://${req.header('host')}${location}`);
  } else if (req.path === '/') {
    res.redirect(301, '/match-center');
  } else {
    const store = createStore(rootReducer, composeEnhancers());
    const context = {};

    const activeRoute = routes.find(route => (
      matchPath(req.path, route)
    ));
    const params = activeRoute
      ? matchPath(req.path, activeRoute).params || {}
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
      const innerHTML = renderToString(<InitialComponent
        store={store}
        location={location}
        context={context}
      />);
      const helmet = Helmet.renderStatic();

      res.send(renderHTML({
        innerHTML,
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        preloadedState: store.getState(),
      }));
    }).catch(() => {
      const innerHTML = renderToString(<InitialComponent
        store={store}
        location={location}
        context={context}
      />);
      const helmet = Helmet.renderStatic();

      res.send(renderHTML({
        innerHTML,
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        preloadedState: store.getState(),
      }));
    });
  }
};

app.use(compression);
app.use(Express.static('dist/assets'));
app.use(Express.static('static'));
app.use(handleRequest);

app.listen(port);
