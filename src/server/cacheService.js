import NodeCache from 'node-cache';

const cacheService = new NodeCache({
  stdTTL: 60 * 60,
  checkperiod: 900,
  useClones: false,
});

export default cacheService;
