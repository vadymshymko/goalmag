const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

require('dotenv-safe').config({
  example: './.example.env',
});

const envVarNameRegExp = /^APP_/i;

const rawEnv = Object.keys(process.env).reduce(
  (result, varName) => {
    if (envVarNameRegExp.test(varName)) {
      return {
        ...result,
        [varName]: process.env[varName],
      };
    }

    return result;
  },
  {
    NODE_ENV: process.env.NODE_ENV || 'production',
    APP_VERSION: Date.now(),
  }
);

const stringifiedEnv = Object.keys(rawEnv).reduce(
  (result, varName) => ({
    ...result,
    [`process.env.${varName}`]: JSON.stringify(rawEnv[varName]),
  }),
  {}
);

const envVars = {
  raw: rawEnv,
  stringified: stringifiedEnv,
};

console.log({
  envVars,
});

const getCommonConfig = (target, mode) => ({
  bail: true,
  name: target,
  target,
  mode,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['src/common', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: `sprite.${envVars.raw.APP_VERSION}.svg`,
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [{ removeDimensions: false }, { removeViewBox: false }],
            },
          },
        ],
        include: /icons/,
        exclude: /node_modules/,
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: target === 'web',
              publicPath: '/',
            },
          },
        ],
        exclude: [/node_modules/, /icons/],
      },
      {
        test: /\.jsx?$/,
        use: 'stylelint-custom-processor-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envVars.stringified),
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new SpriteLoaderPlugin({
      plainSprite: false,
    }),
  ],
  stats: 'minimal',
});

const getClientConfig = (mode) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const isWithHMR = isDev && envVars.raw.APP_HMR === 'true';
  const isWithAnalyze = envVars.raw.APP_BUNDLE_ANALYZER_ENABLED === 'true';

  return webpackMerge(getCommonConfig('web', mode), {
    entry: [
      ...(isWithHMR
        ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
        : []),
      './src/client',
    ],
    output: {
      filename: `[name]${isWithHMR ? '' : '.[contenthash]'}.js`,
      chunkFilename: `[id]${isWithHMR ? '' : '.[contenthash]'}.js`,
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isWithHMR,
              },
            },
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'public')],
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/common/static',
        },
      ]),
      new LoadablePlugin(),
      new MiniCssExtractPlugin({
        filename: `main.${rawEnv.APP_VERSION}.css`,
      }),
      new InjectManifest({
        swSrc: './src/client/serviceWorker.js',
      }),
      ...(isProd ? [new OptimizeCSSAssetsPlugin({})] : []),
      ...(isWithHMR ? [new webpack.HotModuleReplacementPlugin()] : []),
      ...(isWithAnalyze ? [new BundleAnalyzerPlugin()] : []),
    ],
    devtool: isDev && 'source-maps',
  });
};

const getServerConfig = (mode) =>
  webpackMerge(getCommonConfig('node', mode), {
    entry: './src/server',
    output: {
      libraryTarget: 'umd',
      filename: 'index.js',
      chunkFilename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'functions/getSSRApp'),
      publicPath: '/',
    },
    externals: [new NodeExternals()],
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve(__dirname, 'functions/getSSRApp'),
        ],
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/server/views',
          to: 'views',
        },
      ]),
    ],
  });

module.exports = (env, { mode = 'production' } = {}) => [
  getClientConfig(mode),
  getServerConfig(mode),
];
