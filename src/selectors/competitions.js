export const getCompetitionInfo = (state, id = 0) => (
  state.competitions.items.find(competition => (
    parseInt(competition.id, 10) === parseInt(id, 10)
  )) || {}
);

export default getCompetitionInfo;
