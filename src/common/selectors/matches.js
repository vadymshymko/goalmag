import { createSelector } from 'reselect';
import { getDate, getCompetitionId, getMatchId } from './router';

const getMatches = state => state.matches;

export const getMatchesIsFetching = createSelector(
  getMatches,
  matches => matches.isFetching
);

export const getMatchesIsInitialized = createSelector(
  getMatches,
  matches => matches.isInitialized
);

export const getMatchesEntities = createSelector(
  getMatches,
  matches => matches.entities
);

export const getMatchesIds = createSelector(getMatches, matches => matches.ids);

export const getMatchesItems = createSelector(
  getMatchesIds,
  getMatchesEntities,
  (ids, entities) => ids.map(id => entities[id])
);

export const getVisibleMatchesItems = createSelector(
  getMatchesItems,
  getDate,
  getCompetitionId,
  (matchesItems, matchesDate, matchesCompetitionId) =>
    matchesItems.filter(
      match =>
        match.dateUTC === matchesDate &&
        (!matchesCompetitionId || matchesCompetitionId === match.competitionId)
    )
);

export const getMatch = createSelector(
  getMatchesEntities,
  getMatchId,
  (entities, id) => entities[id] || {}
);
