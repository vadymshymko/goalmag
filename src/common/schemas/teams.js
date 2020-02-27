import { schema } from 'normalizr';

export const teamSchema = new schema.Entity(
  'teams',
  {},
  {
    idAttribute: 'teamId',
    processStrategy: team => {
      return {
        ...team,
        id: team.teamId,
        competitions: team.leagues,
      };
    },
  }
);

export default teamSchema;
