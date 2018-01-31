const webpackProdConfig = require('./webpack.prod.config');
const webpackDevConfig = require('./webpack.dev.config');

const env = process.env.NODE_ENV || 'production';

if (env === 'production') {
  module.exports = webpackProdConfig;
} else {
  module.exports = webpackDevConfig;
}
