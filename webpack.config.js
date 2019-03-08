const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WebpackNodeExternals = require('webpack-node-externals');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');

const getCommonConfig = mode => ({
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src/common'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.EnvironmentPlugin({
      NODE_ENV: mode,
    }),
  ],
  module: {
    rules: [
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
    ],
  },
  optimization:
    mode === 'production'
      ? {
        minimizer: [
          new TerserWebpackPlugin({
            terserOptions: {
              parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8,
              },
              compress: {
                drop_console: true,
                ecma: 5,
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebook/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
                // Disabled because of an issue with Terser breaking valid code:
                // https://github.com/facebook/create-react-app/issues/5250
                // Pending futher investigation:
                // https://github.com/terser-js/terser/issues/120
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true,
              },
            },
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            parallel: true,
            // Enable file caching
            cache: true,
          }),
        ],
        mangleWasmImports: true,
      }
      : {},
  stats: 'minimal',
});

const getClientConfig = mode => (
  webpackMerge(
    getCommonConfig(mode),
    {
      target: 'web',
      entry: './src/client/index.jsx',
      output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].[contenthash].js',
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '/',
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: 'src/common/static',
          },
        ]),
        new LoadableWebpackPlugin(),
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: './src/client/serviceWorker.js',
          swDest: 'service-worker.js',
        }),
        new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
          analyzerMode: 'static',
        }),
        new WebpackBar({
          name: 'client',
        }),
      ],
    },
  )
);

const getServerConfig = mode => (
  webpackMerge(
    getCommonConfig(mode),
    {
      target: 'node',
      entry: ['@babel/polyfill', './src/server/index.js'],
      output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: 'src/server/views',
            to: 'views',
          },
        ]),
        new WebpackBar({
          name: 'server',
        }),
      ],
      externals: [new WebpackNodeExternals()],
    },
  )
);

module.exports = (env, { mode = 'production' } = {}) => [
  getClientConfig(mode),
  getServerConfig(mode),
];
