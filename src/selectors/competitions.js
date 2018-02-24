export const getCompetitions = state => (
  state.competitions.allIds.map(id => (
    state.competitions.byId[id]
  ))
);

export const getCompetition = (state, id = 0) => (
  state.competitions.byId[id]
);

export const getIsCompetitionsFetching = state => (
  state.competitions.isFetching
);

export const getIsCompetitionsInitialized = state => (
  state.competitions.isInitialized
);
