import { schema } from 'normalizr';

export const competitionSchema = new schema.Entity(
  'competitions',
  {},
  {
    processStrategy: competition => {
      return {
        ...competition,
        href: `/competitions/${competition.id}`,
      };
    },
  }
);
export const competitionsSchema = [competitionSchema];
