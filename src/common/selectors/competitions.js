import { createSelector } from 'reselect';
import { getVisibleMatchesItems } from './matches';
import { getCompetitionId } from './router';

const getCompetitions = state => state.competitions;

export const getCompetitionsIsFetching = createSelector(
  getCompetitions,
  competitions => competitions.isFetching
);

export const getCompetitionsIsInitialized = createSelector(
  getCompetitions,
  competitions => competitions.isInitialized
);

export const getCompetitionsEntities = createSelector(
  getCompetitions,
  competitions => competitions.entities
);

export const getCompetitionsIds = createSelector(
  getCompetitions,
  competitions => competitions.ids
);

export const getCompetitionsItems = createSelector(
  getCompetitionsIds,
  getCompetitionsEntities,
  (ids, entities) => ids.map(id => entities[id])
);

export const getRegionsWithCompetitions = createSelector(
  getCompetitionsItems,
  competitionsItems => {
    const regions = [
      ...new Set(competitionsItems.map(competition => competition.region)),
    ];

    return regions.map(region => ({
      name: region,
      competitions: competitionsItems.filter(
        competition => competition.region === region
      ),
    }));
  }
);

export const getCompetitionsWithMatches = createSelector(
  getCompetitionsEntities,
  getVisibleMatchesItems,
  (competitionsEntities, matchesItems) => {
    const competitionsIds = [
      ...new Set([...matchesItems.map(match => match.competitionId)]),
    ];

    return competitionsIds.map(competitionId => ({
      ...competitionsEntities[competitionId],
      matchesItems: matchesItems.filter(
        match => match.competitionId === competitionId
      ),
    }));
  }
);

export const getCompetition = createSelector(
  getCompetitionsEntities,
  getCompetitionId,
  (entities, id) => entities[id] || {}
);
