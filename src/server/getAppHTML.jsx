import React from 'react';
import { renderToString } from 'react-dom/server';

import Root from 'components/Root';

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

export default getAppHTML;
