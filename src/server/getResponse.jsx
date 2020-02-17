import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';
import serialize from 'serialize-javascript';

import configureStore from 'store';

import redirect from './redirect';
import getAppHTML from './getAppHTML';

const chunkStatsFile = path.resolve(
  `${process.env.APP_CLIENT_BUILD_OUTPUT_PATH}/loadable-stats.json`
);

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

    const appHTML = getAppHTML({
      store,
      chunkExtractor,
      styleSheetExtractor,
      routerContext,
      locationURL: req.url,
    });

    res.set(
      'Cache-Control',
      `max-age=${process.env.APP_SERVER_RESPONSE_CACHE_MAX_AGE}`
    );

    return res.status(routerContext.status || 200).render('index', {
      title: '<title>Some Title</title>',
      appHTML,
      styleTags: styleSheetExtractor.getStyleTags(),
      prefetchLinks: chunkExtractor.getLinkTags(),
      scriptTags: chunkExtractor.getScriptTags(),
      initialState: serialize(store.getState()),
    });
  } catch (error) {
    console.error(error);

    res.set('Cache-Control', 'no-cache');
    return res.status(500).send('Internal Server Error');
  }
};

export default getResponse;
