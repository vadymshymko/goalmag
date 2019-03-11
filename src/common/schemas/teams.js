import { schema } from 'normalizr';
import moment from 'moment';

export const team = new schema.Entity(
  'teams',
  {},
  {
    processStrategy: teamInfo => ({
      ...teamInfo,
      crestUrl: (teamInfo.crestUrl || '').replace('http://', 'https://'),
      squad: teamInfo.squad.map(item => ({
        ...item,
        dateOfBirth: moment(item.dateOfBirth).format('YYYY-MM-DD'),
      })),
    }),
  },
);

export const teams = [team];
