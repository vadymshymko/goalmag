import express from 'express';
import compression from 'compression';

import cacheService from './cacheService';
import getResponse from './getResponse';

const isDev = process.env.NODE_ENV === 'development';

const setHeaders = (res, path) => {
  if (path.includes('service-worker.js')) {
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache');
  }
};

const redirectMiddleware = (req, res, next) => {
  const location = req.url;
  const isNotHTTPS = req.header('x-forwarded-proto') && (req.header('x-forwarded-proto') !== 'https');

  if (isNotHTTPS) {
    return res.redirect(301, `https://${req.header('host')}${location}`);
  }

  return next();
};

const cacheMiddleware = (req, res, next) => {
  try {
    const cachedResponseState = cacheService.get(`page${req.path}`, true);
    return res.status(cachedResponseState.status).render('index', cachedResponseState);
  } catch (e) {
    return next();
  }
};

const app = express();
const PORT = process.env.PORT || 8080;

app.set('views', 'dist/views');
app.set('view engine', 'pug');
app.use(compression());
app.use(express.static('dist/assets', {
  setHeaders,
  maxAge: 60 * 60 * 24 * 30,
}));
app.get('*', redirectMiddleware);

if (isDev) {
  /* eslint-disable global-require */
  const { devMiddleware, hotMiddleware } = require('./devMiddleware');

  app.use(devMiddleware);
  app.use(hotMiddleware);
  /* eslint-enable global-require */
} else {
  app.get('*', cacheMiddleware);
}

app.get('*', getResponse);
app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`); // eslint-disable-line
});
