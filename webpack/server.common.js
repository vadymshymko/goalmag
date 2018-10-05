const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const NodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/server/index.jsx',
  ],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../src/common'),
      'node_modules',
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/server/views',
        to: 'views',
      },
    ]),
  ],
  target: 'node',
  externals: [new NodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
