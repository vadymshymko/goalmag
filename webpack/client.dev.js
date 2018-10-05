const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./client.common.js');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    host: '0.0.0.0',
    port: 8080,
  },
  devtool: 'inline-source-map',
  entry: [
    '@babel/polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    './src/client/index.jsx',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/common/assets/index.html',
    }),
  ],
});
