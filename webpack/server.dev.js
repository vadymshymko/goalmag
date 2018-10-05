const webpackMerge = require('webpack-merge');

const commonConfig = require('./server.common.js');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
});
