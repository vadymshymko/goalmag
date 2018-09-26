const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { GenerateSW } = require('workbox-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./client.common.js');

module.exports = webpackMerge(commonConfig, {
  entry: [
    'babel-polyfill',
    './index.js',
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    new GenerateSW(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'sass-loader',
            'postcss-loader',
          ],
        }),
        exclude: /node_modules/,
      },
    ],
  },
});
