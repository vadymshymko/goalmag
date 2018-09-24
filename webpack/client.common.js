const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../common'),
      'node_modules',
    ],
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.resolve(__dirname, '../'),
      },
    ),
    new CopyWebpackPlugin([
      {
        from: 'static',
      },
    ]),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
