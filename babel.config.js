module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-proposal-export-default-from'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@loadable/babel-plugin'],
  ],
  env: {
    development: {
      sourceType: process.env.APP_HMR === 'true' ? 'unambiguous' : 'module',
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            fileName: true,
            displayName: true,
          },
        ],
      ],
    },
    production: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: false,
            fileName: false,
            minify: true,
            transpileTemplateLiterals: true,
            pure: true,
          },
        ],

        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
            classNameMatchers: ['Component', 'PureComponent'],
            additionalLibraries: ['prop-types'],
          },
        ],

        ['transform-remove-console', { exclude: ['error', 'warn', 'info'] }],
      ],
    },
  },
};
