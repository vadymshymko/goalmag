import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import rootReducer from 'reducers';
import composeEnhancers from 'composeEnhancers';

import { fetchCompetitions } from 'actions';

import AppContainer from 'containers/AppContainer';

const app = Express();
const port = process.env.PORT || 8080;

const renderFullPage = ({
  title = '',
  description = '',
  preloadedState = {},
  html = '',
}) => (`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      <title>"${title} - Goal Magazine"</title>
      <meta name="description" content="${description}" />

      <meta name="image" content="/logo.svg" />

      <!-- Schema.org for Google -->
      <meta itemProp="name" content="${title} - Goal Magazine" />
      <meta itemProp="description" content="${description}" />
      <meta itemProp="image" content="/logo.svg" />

      <!-- Twitter -->
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="${title} - Goal Magazine" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:site" content="@vadymshymko" />
      <meta name="twitter:creator" content="@vadymshymko" />
      <meta name="twitter:image:src" content="/logo.svg" />

      <!-- Open Graph general (Facebook, Pinterest & Google+) -->
      <meta name="og:title" content="${title} - Goal Magazine" />
      <meta name="og:description" content="${description}" />
      <meta name="og:image" content="/logo.svg" />
      <meta name="og:url" content="https://goalmag.herokuapp.com" />
      <meta name="og:site_name" content="Goal Magazine" />
      <meta name="og:locale" content="en_US" />
      <meta name="fb:admins" content="100002165463093" />
      <meta name="fb:app_id" content="2048470848761820" />
      <meta name="og:type" content="website" />

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
      <div class="root" id="root">${html}</div>

      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>

      <script src="/bundle.js"></script>
    </body>
  </html>
`);

const handleRender = (req, res) => {
  const store = createStore(rootReducer, composeEnhancers());
  const preloadedState = store.getState();
  const html = renderToString((
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={{}}
      >
        <AppContainer />
      </StaticRouter>
    </Provider>
  ));

  store.dispatch(fetchCompetitions);

  res.send(renderFullPage({
    title: 'Title',
    description: 'description',
    html,
    preloadedState,
  }));
};

app.use(Express.static('dist/assets'));
app.use(Express.static('static'));

app.use(handleRender);
app.listen(port);

// app.use(express.static(DIST_DIR));
// app.use((req, res) => {
//   routes.some((route) => {
//   // use `matchPath` here
//     const match = matchPath(req.path, route);
//
//     if (match) {
//       console.log(match, route);
//     }
//
//     return match;
//   });
// });
