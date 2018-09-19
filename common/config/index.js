import prodConfig from './config.prod';
import devConfig from './config.dev';

const env = process.env.NODE_ENV || 'production';

const commonConfig = {
  apiRoot: '//api.football-data.org/v2/',
  apiKey: '724a8fd63a4742099053576de1bd4439',
};

export default {
  ...commonConfig,
  ...(env === 'production'
    ? prodConfig
    : devConfig
  ),
};
