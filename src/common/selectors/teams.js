import { createSelector } from 'reselect';

import { getTeamId } from './router';

const getTeams = state => state.teams;

export const getTeam = createSelector(
  getTeams,
  getTeamId,
  (teams, teamId) => teams[teamId] || {}
);

export default getTeam;
