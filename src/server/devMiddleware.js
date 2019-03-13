import webpack from 'webpack';
import webpakDevMiddleware from 'webpack-dev-middleware';
import webpakHotMiddleware from 'webpack-hot-middleware';

const webpackConfig = require('../../webpack.config');

const webpackClientConfig = webpackConfig({}, { mode: 'development' })[0];
const compiler = webpack(webpackClientConfig);

export const devMiddleware = webpakDevMiddleware(compiler, {
  logLevel: 'warn',
});

export const hotMiddleware = webpakHotMiddleware(compiler, {
  log: console.log, // eslint-disable-line
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
});
