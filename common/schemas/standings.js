import { schema } from 'normalizr';

export const standing = new schema.Entity('standings', undefined, { idAttribute: 'type' });
export const standings = [standing];

export default standings;
