import { createSelector } from 'reselect';

export const getCompetitionsIds = state => (
  state.competitions.ids
);

export const getCompetitionsEntities = state => (
  state.competitions.entities
);

export const getCompetitions = createSelector(
  getCompetitionsIds,
  getCompetitionsEntities,
  (ids, entities) => (
    ids.map(id => (
      entities[id]
    ))
  ),
);

export const getCompetition = (state, id = 0) => (
  state.competitions.entities[id]
);

export const getIsCompetitionsFetching = state => (
  state.competitions.isFetching
);

export const getIsCompetitionsInitialized = state => (
  state.competitions.lastUpdated > 0
);
