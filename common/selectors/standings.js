import { createSelector } from 'reselect';

export const getStandings = (state, id) => (
  state.standings[id] || {}
);

export const getStandingsTable = createSelector(
  getStandings,
  (state, id, type = 'total') => type,
  (standings, type) => (
    ((standings.entities || {})[type.toUpperCase()] || {}).table || []
  ),
);

export const getIsStandingsFetching = createSelector(
  getStandings,
  standings => (
    !!standings.isFetching
  ),
);

export const getIsStandingsInitialized = createSelector(
  getStandings,
  standings => (
    !!standings.isInitialized
  ),
);
