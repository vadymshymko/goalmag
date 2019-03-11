import { schema } from 'normalizr';

export const team = new schema.Entity(
  'teams',
  {},
  {
    processStrategy: teamInfo => ({
      ...teamInfo,
      crestUrl: (teamInfo.crestUrl || '').replace('http://', 'https://'),
    }),
  },
);

export const teams = [team];
