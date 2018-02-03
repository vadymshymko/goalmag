export const getTeamState = (teamId, {
  teams,
}) => (
  teams[teamId]
);

export default getTeamState;
