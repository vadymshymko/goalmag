export const getTeam = (state, id) => (
  state.teams.byId[id]
);

export default getTeam;
