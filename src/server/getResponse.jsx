import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';

import Root from 'components/Root';
import configureStore from 'store';
import routes from 'routes';

const chunkStatsFile = path.resolve(
  `${process.env.APP_CLIENT_BUILD_OUTPUT_PATH}/loadable-stats.json`
);

const responseCacheControl =
  process.env.NODE_ENV === 'production'
    ? `max-age=${process.env.APP_SERVER_RESPONSE_CACHE_MAX_AGE}`
    : 'no-cache';

const redirect = ({ status, url, res }) => res.redirect(status || 301, url);

const getActiveRoute = req => {
  return routes.reduce((result, route) => {
    if (result) {
      return result;
    }

    if (!route.path) {
      return route;
    }

    const match = matchPath(req.path, route);

    if (match) {
      return {
        ...route,
        match,
      };
    }

    return result;
  }, null);
};

const getActiveRouteInitialAction = async ({ activeRoute, req, store }) => {
  if (!(!!activeRoute.match && activeRoute.props.initialAction)) {
    return null;
  }

  const [locationPathname, locationSearch] = req.originalUrl.split('?');

  const location = {
    pathname: locationPathname,
    search: locationSearch ? `?${locationSearch}` : '',
  };

  return activeRoute.props.initialAction(store.dispatch, {
    match: activeRoute.match,
    location,
    isServer: true,
  });
};

const getAppHTML = ({
  store,
  chunkExtractor,
  styleSheetExtractor,
  routerContext,
  locationURL,
}) => {
  return renderToString(
    chunkExtractor.collectChunks(
      styleSheetExtractor.collectStyles(
        <Root
          routerContext={routerContext}
          locationURL={locationURL}
          store={store}
          env="server"
        />
      )
    )
  );
};

const getResponse = async (req, res) => {
  try {
    // const isHeroku = req.header('host').includes('heroku');

    const [locationPathname, locationSearch] = req.originalUrl.split('?');
    const isEndsWithSlash =
      locationPathname.length > 1 && locationPathname.endsWith('/');
    // const validURL = `${
    //   isEndsWithSlash ? locationPathname.slice(0, -1) : locationPathname
    // }${locationSearch ? `?${locationSearch}` : ''}`;

    // if (isHeroku) {
    //   return redirect({
    //     res,
    //     url: `https://goal.now.sh${validURL}`,
    //   });
    // }

    if (isEndsWithSlash) {
      return redirect({
        res,
        url: `${locationPathname.slice(0, -1)}${
          locationSearch ? `?${locationSearch}` : ''
        }`,
        status: 301,
      });
    }

    const store = configureStore();
    const chunkExtractor = new ChunkExtractor({ statsFile: chunkStatsFile });
    const styleSheetExtractor = new ServerStyleSheet();
    const routerContext = {};

    const activeRoute = getActiveRoute(req);

    await getActiveRouteInitialAction({
      activeRoute,
      req,
      store,
    });

    const appHTML = getAppHTML({
      store,
      chunkExtractor,
      styleSheetExtractor,
      routerContext,
      locationURL: req.url,
    });

    if (routerContext.status === 301 && routerContext.url) {
      redirect({
        res,
        url: routerContext.url,
        status: 301,
      });
    }

    const helmet = Helmet.renderStatic();

    const title = helmet.title.toString();
    const metaTags = helmet.meta.toString();
    const linkTags = helmet.link.toString();
    const mainCSSFilePath = `${process.env.APP_CLIENT_BUILD_PUBLIC_PATH}main.${process.env.APP_VERSION}.css`;
    const styleTags = styleSheetExtractor.getStyleTags();
    const prefetchLinks = chunkExtractor.getLinkTags();
    const scriptTags = chunkExtractor.getScriptTags();
    const initialState = serialize(store.getState());

    res
      .set('Cache-Control', responseCacheControl)
      .status(routerContext.status || 200);

    return res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      ${title}

      <meta name="image" content="https://goal.now.sh/logo.svg"/>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@vadymshymko"/>
      <meta name="twitter:creator" content="@vadymshymko"/>
      <meta name="twitter:image:src" content="https://goal.now.sh/logo.svg"/>
      <meta name="og:image" content="https://goal.now.sh/logo.svg" />
      <meta name="og:site_name" content="GoalMag" />
      <meta name="og:locale" content="en_US" />
      <meta name="fb:admins" content="100002165463093" />
      <meta name="fb:app_id" content="2048470848761820" />
      <meta name="og:type" content="website" />
      <meta name="msapplication-TileColor" content="#00a300" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png"/>
      <meta name="theme-color" content="#ffffff"/>
      <meta name="google-site-verification" content="cySttcjM5zAsRGED5LSc0OdmgZTSwnzqtYAa3ytIfEs"/>

      ${metaTags}

      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Noto+Sans:400,600,700,800&display=swap" />
      <link rel="stylesheet" href="${mainCSSFilePath}" />

      <link rel="apple-touch-icon" size="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" size="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" size="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" color="#28a745" href="/safari-pinned-tab.svg" />
      ${linkTags}
      ${styleTags}
      ${prefetchLinks}
    </head>

    <body>
      <div id="root">${appHTML}</div>

      <script>window.APP_INITIAL_STATE = ${initialState}</script>

      ${scriptTags}
    </body>
  </html>
`);
  } catch (error) {
    console.error('server error: ', error);

    res.set('Cache-Control', 'no-cache');
    return res.status(500).send('Internal Server Error');
  }
};

export default getResponse;
