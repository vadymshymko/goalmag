import { createSelector } from 'reselect';

import { getCompetitionId } from './router';

const getStandings = state => state.standings;

export const getCompetitionStandings = createSelector(
  getStandings,
  getCompetitionId,
  (standings, competitionId) => standings[competitionId] || {}
);

export const getCompetitionStandingsIsFetching = createSelector(
  getCompetitionStandings,
  standings => standings.isFetching
);

export const getCompetitionStandingsTable = createSelector(
  getCompetitionStandings,
  standings => standings.table || {}
);
