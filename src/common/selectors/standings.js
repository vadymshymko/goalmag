import { createSelector } from 'reselect';

export const getStandings = state => state.standings;

export const getStandingsById = createSelector(
  getStandings,
  (state, id) => id,
  (standings, id) => standings[id] || {},
);

export const getStandingsTable = createSelector(
  getStandingsById,
  (state, id, type = 'total') => type,
  (standings, type) => (
    (standings.items || []).filter(({ type: tableType }) => type.toUpperCase() === tableType) || []
  ),
);

export const getIsStandingsFetching = createSelector(
  getStandingsById,
  standings => (
    !!standings.isFetching
  ),
);

export const getIsStandingsInitialized = createSelector(
  getStandingsById,
  standings => (
    !!standings.isInitialized
  ),
);

export const getStandingsLastUpdated = createSelector(
  getStandingsById,
  standings => (
    standings.lastUpdated || 0
  ),
);
