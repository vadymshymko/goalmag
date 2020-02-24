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

const getActiveRouteLoadData = async ({ activeRoute, req, store }) => {
  if (!(!!activeRoute.match && activeRoute.loadData)) {
    return null;
  }

  const [locationPathname, locationSearch] = req.originalUrl.split('?');

  const location = {
    pathname: locationPathname,
    search: locationSearch ? `?${locationSearch}` : '',
  };

  return activeRoute.loadData(store.dispatch, {
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
    const [locationPathname, locationSearch] = req.originalUrl.split('?');
    const isWithoutTrailingSlash = !locationPathname.endsWith('/');

    if (isWithoutTrailingSlash) {
      return redirect({
        res,
        url: `${locationPathname}/${
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

    await getActiveRouteLoadData({
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

    const helmet = Helmet.renderStatic();

    return res
      .set(
        'Cache-Control',
        `max-age=${process.env.APP_SERVER_RESPONSE_CACHE_MAX_AGE}`
      )
      .status(routerContext.status || 200)
      .render('index', {
        title: helmet.title.toString(),
        metaTags: helmet.meta.toString(),
        linkTags: helmet.link.toString(),
        mainCSSFilePath: `${process.env.APP_CLIENT_BUILD_PUBLIC_PATH}main.${process.env.APP_VERSION}.css`,
        styleTags: styleSheetExtractor.getStyleTags(),
        prefetchLinks: chunkExtractor.getLinkTags(),
        scriptTags: chunkExtractor.getScriptTags(),
        initialState: serialize(store.getState()),
        appHTML,
      });
  } catch (error) {
    console.error('server error: ', error);

    res.set('Cache-Control', 'no-cache');
    return res.status(500).send('Internal Server Error');
  }
};

export default getResponse;
