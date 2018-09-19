import { schema } from 'normalizr';

export const competition = new schema.Entity('competitions');
export const competitions = { competitions: new schema.Array(competition) };
