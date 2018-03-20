const path = require('path');
const NodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    'babel-polyfill',
    './server/server.jsx',
  ],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../common'),
      'node_modules',
    ],
  },
  target: 'node',
  externals: [new NodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'babel-plugin-transform-require-ignore',
                {
                  extensions: ['.scss', '.css'],
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
