const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./common.js');

module.exports = webpackMerge(commonConfig, {
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    host: '0.0.0.0',
    port: 8080,
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.jsx',
  ],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
});
