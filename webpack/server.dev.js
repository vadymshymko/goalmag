const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./server.common.js');

module.exports = webpackMerge(commonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
