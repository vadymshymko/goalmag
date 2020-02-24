import { createSelector } from 'reselect';

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

export const getCompetitionsNavSections = createSelector(
  getCompetitionsItems,
  competitionsItems => {
    const regions = [
      ...new Set(competitionsItems.map(competition => competition.region)),
    ];

    return regions.map(region => ({
      region,
      competitions: competitionsItems.filter(
        competition => competition.region === region
      ),
    }));
  }
);
