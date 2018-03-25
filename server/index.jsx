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

import criticalCSS from './criticalCSS';

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

      <style>
        ${criticalCSS}
      </style>

      ${styles.map(style => `<link href="/dist/${style.file}" rel="stylesheet"/>`.join('\n'))}

      <link rel="preload" href="/bundle.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
      <link rel="preload" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700" as="style" onload="this.onload=null;this.rel='stylesheet'" />

      <noscript>
        <link href="/bundle.css" rel="stylesheet" />
        <link href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
      </noscript>

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

      <script async>
        /*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
        (function(w){
          "use strict";
          /* exported loadCSS */
          var loadCSS = function( href, before, media ){
            // Arguments explained:
            // href [REQUIRED] is the URL for your CSS file.
            // before [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
            // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
            // media [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
            var doc = w.document;
            var ss = doc.createElement( "link" );
            var ref;
            if( before ){
              ref = before;
            }
            else {
              var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
              ref = refs[ refs.length - 1];
            }

            var sheets = doc.styleSheets;
            ss.rel = "stylesheet";
            ss.href = href;
            // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
            ss.media = "only x";

            // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
            function ready( cb ){
              if( doc.body ){
                return cb();
              }
              setTimeout(function(){
                ready( cb );
              });
            }
            // Inject link
              // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
              // Note: insertBefore is used instead of appendChild, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
            ready( function(){
              ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
            });
            // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
            var onloadcssdefined = function( cb ){
              var resolvedHref = ss.href;
              var i = sheets.length;
              while( i-- ){
                if( sheets[ i ].href === resolvedHref ){
                  return cb();
                }
              }
              setTimeout(function() {
                onloadcssdefined( cb );
              });
            };

            function loadCB(){
              if( ss.addEventListener ){
                ss.removeEventListener( "load", loadCB );
              }
              ss.media = media || "all";
            }

            // once loaded, set link's media back to all so that the stylesheet applies once it loads
            if( ss.addEventListener ){
              ss.addEventListener( "load", loadCB);
            }
            ss.onloadcssdefined = onloadcssdefined;
            onloadcssdefined( loadCB );
            return ss;
          };
          // commonjs
          if( typeof exports !== "undefined" ){
            exports.loadCSS = loadCSS;
          }
          else {
            w.loadCSS = loadCSS;
          }
        }( typeof global !== "undefined" ? global : this ));
      </script>

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
