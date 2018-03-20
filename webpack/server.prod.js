const webpackMerge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./server.common.js');

module.exports = webpackMerge(commonConfig, {
  plugins: [
    new UglifyJSPlugin(),
  ],
});
