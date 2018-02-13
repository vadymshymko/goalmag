import { schema } from 'normalizr';

export const fixture = new schema.Entity('fixtures');

export const fixtures = [fixture];

export default fixtures;
