import { createSelector } from 'reselect';

import { getTeamId } from './router';

const getTeams = state => state.teams;

export const getTeam = createSelector(
  getTeams,
  getTeamId,
  (teams, teamId) => teams[teamId] || {}
);

export const getTeamIsFetching = createSelector(
  getTeam,
  team => team.isFetching
);

export const getTeamIsInitialized = createSelector(
  getTeam,
  team => team.isInitialized
);

export const getTeamInfo = createSelector(getTeam, team => team.info || {});
