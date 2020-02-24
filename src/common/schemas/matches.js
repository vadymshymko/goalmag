import { schema } from 'normalizr';

export const matchSchema = new schema.Entity(
  'matches',
  {},
  {
    processStrategy: match => {
      return {
        ...match,
        id: match.id,
        competitionId: match.compId,
        href: `/matches/${match.id}`,
        localteamId: match.localteamId,
        localteamName: match.localteamName,
        localteamScore: match.localteamScore,
        visitorteamId: match.visitorteamId,
        visitorteamName: match.visitorteamName,
        visitorteamScore: match.visitorteamScore,
      };
    },
  }
);

export const matchesSchema = [matchSchema];
