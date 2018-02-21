export const getFixtures = state => (
  state.fixtures.allIds.map(id => (
    state.fixtures.byId[id]
  ))
);

export const getFixture = (state, id = 0) => (
  state.fixtures.byId[id]
);

export const getFixturesInitializedFilters = state => (
  state.fixtures.initializedFilters
);

export const getIsFixturesFetching = state => (
  state.fixtures.isFetching
);
