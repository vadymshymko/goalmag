export const getTeamState = (state, id) => (
  state.teams.byId[id]
);

export default getTeamState;
