export const getCompetitions = state => (
  state.competitions.ids.map(id => ({
    ...state.competitions.items[id],
  }))
);

export const getCompetition = (state, id = 0) => (
  state.competitions.items[id]
);

export const getCompetitionName = (state, id) => {
  const competition = getCompetition(state, id);

  if (!competition) {
    return null;
  }

  return competition.caption;
};
