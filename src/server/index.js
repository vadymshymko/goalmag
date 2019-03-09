import express from 'express';
import compression from 'compression';

import getResponse from './getResponse';

const setHeaders = (res, path) => {
  if (path.includes('service-worker.js')) {
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache');
  }
};

const redirectMiddleware = (req, res, next) => {
  const location = req.url;
  const requestPath = req.path;
  const isNotHTTPS = req.header('x-forwarded-proto') && (req.header('x-forwarded-proto') !== 'https');

  if (isNotHTTPS) {
    return res.redirect(301, `https://${req.header('host')}${requestPath === '/'
      ? '/match-center'
      : location
    }`);
  }

  if (requestPath === '/') {
    return res.redirect(301, '/match-center');
  }

  return next();
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
app.get('*', getResponse);
app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`); // eslint-disable-line
});
