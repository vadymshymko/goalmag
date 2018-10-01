const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./client.common.js');

module.exports = webpackMerge(commonConfig, {
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    host: '0.0.0.0',
    port: 8080,
  },
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    './index.js',
  ],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/common/assets/index.html',
    }),
  ],
});
