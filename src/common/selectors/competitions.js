import { createSelector } from 'reselect';

export const getCompetitions = state => state.competitions;

export const getCompetitionsIds = state => (
  state.competitions.ids
);

export const getCompetitionsEntities = state => (
  state.competitions.entities
);

export const getCompetitionsItems = createSelector(
  getCompetitionsIds,
  getCompetitionsEntities,
  (ids, entities) => (
    ids.map(id => (
      entities[id]
    ))
  ),
);

export const getCompetition = (state, id = 0) => (
  state.competitions.entities[id] || {}
);

export const getCompetitionName = createSelector(
  getCompetition,
  competition => (
    competition.name || ''
  ),
);

export const getCompetitionCurrentSeason = createSelector(
  getCompetition,
  competition => (
    competition.currentSeason || {}
  ),
);

export const getCompetitionCurrentMatchDay = createSelector(
  getCompetitionCurrentSeason,
  currentSeason => (
    currentSeason.currentMatchday || 0
  ),
);

export const getIsCompetitionsFetching = state => (
  !!state.competitions.isFetching
);

export const getIsCompetitionsInitialized = state => (
  !!state.competitions.isInitialized
);
