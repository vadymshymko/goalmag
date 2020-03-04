import webpack from 'webpack';

/* eslint-disable global-require */
const webpackConfig = require('../../../webpack.config');

const webpackConfigClient = webpackConfig({}, { mode: 'development' })[0];
const compiler = webpack(webpackConfigClient);

export const devMiddleware = () =>
  require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    publicPath: webpackConfigClient.output.publicPath,
  });

export const hotMiddleware = () =>
  require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  });

/* eslint-enable global-require */
