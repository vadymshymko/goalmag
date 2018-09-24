import { createSelector } from 'reselect';

export const getTeam = (state, id) => (
  state.teams.entities[id] || {}
);

export const getTeamName = createSelector(
  getTeam,
  team => team.name,
);

export const getTeamLogoURL = createSelector(
  getTeam,
  team => team.crestUrl || '',
);

export const getTeamSquad = createSelector(
  getTeam,
  team => team.squad || [],
);

export const getTeamPlayers = createSelector(
  getTeamSquad,
  squad => squad.filter(item => (
    item.role.toLowerCase() === 'player'
  )),
);

export const getTeamCoach = createSelector(
  getTeamSquad,
  squad => squad.find(item => (
    item.role.toLowerCase() === 'coach'
  )) || {},
);
