import { createSelector } from 'reselect';

export const getTeams = state => state.teams;

export const getTeamsEntities = createSelector(
  getTeams,
  teams => teams.entities,
);

export const getTeamById = createSelector(
  getTeamsEntities,
  (state, id) => id,
  (entities, id) => (
    entities[id] || {}
  ),
);

export const getTeamName = createSelector(
  getTeamById,
  team => team.name,
);

export const getTeamLogoURL = createSelector(
  getTeamById,
  team => team.crestUrl || '',
);

export const getTeamSquad = createSelector(
  getTeamById,
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
