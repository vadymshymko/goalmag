require('babel-register')({
  plugins: [
    [
      'babel-plugin-transform-require-ignore',
      {
        extensions: ['.scss', '.css'],
      },
    ],
    [
      'babel-plugin-module-resolver', {
        root: ['common'],
      },
    ],
  ],
});
require('babel-polyfill');
require('./server');
