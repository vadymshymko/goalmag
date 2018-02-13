export const getCompetitions = state => (
  state.competitions.ids.map(id => ({
    ...state.competitions.byId[id],
  }))
);

export const getCompetition = (state, id = 0) => (
  state.competitions.byId[id]
);

export const getIsCompetitionsInitialized = state => (
  state.competitions.isInitialized
);
