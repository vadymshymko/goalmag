export const getCompetitions = state => (
  state.competitions.ids.map(id => (
    state.competitions.entities[id]
  ))
);

export const getCompetition = (state, id = 0) => (
  state.competitions.entities[id]
);

export const getIsCompetitionsFetching = state => (
  state.competitions.isFetching
);

export const getIsCompetitionsInitialized = state => (
  state.competitions.isInitialized
);
