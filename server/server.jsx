import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  StaticRouter,
  matchPath,
} from 'react-router-dom';
import Helmet from 'react-helmet';

import rootReducer from 'reducers';
import composeEnhancers from 'composeEnhancers';
import routes from 'routes';

import AppContainer from 'containers/AppContainer';

import {
  fetchCompetitions,
  fetchTeam,
  fetchSquad,
} from 'actions';

import renderHTML from './html';

const app = Express();
const port = process.env.PORT || 8080;

const handleRequest = (req, res) => {
  const store = createStore(rootReducer, composeEnhancers());
  const activeRoute = routes.find(route => (
    matchPath(req.path, route)
  ));
  const params = activeRoute
    ? matchPath(req.path, activeRoute).params || {}
    : {};

  const context = {};
  const InitialComponent = (
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <AppContainer />
      </StaticRouter>
    </Provider>
  );

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
    const innerHTML = renderToString(InitialComponent);
    const helmet = Helmet.renderStatic();

    res.send(renderHTML({
      innerHTML,
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      preloadedState: store.getState(),
    }));
  }).catch(() => {
    const innerHTML = renderToString(InitialComponent);
    const helmet = Helmet.renderStatic();

    res.send(renderHTML({
      innerHTML,
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      preloadedState: store.getState(),
    }));
  });
};

app.use(Express.static('dist/assets'));
app.use(Express.static('static'));
app.use(handleRequest);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
