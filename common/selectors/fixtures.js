import { createSelector } from 'reselect';

export const getFixturesState = (state, id) => (
  state.fixtures[id] || {}
);

export const getFixturesLastUpdated = createSelector(
  getFixturesState,
  fixturesState => (
    fixturesState.lastUpdated || 0
  ),
);

export const getIsFixturesFetching = createSelector(
  getFixturesState,
  fixturesState => (
    !!fixturesState.isFetching
  ),
);

export const getIsFixturesInitialized = createSelector(
  getFixturesState,
  fixturesState => (
    !!fixturesState.isInitialized
  ),
);

export const getIsFixturesAllItemsFinished = createSelector(
  getFixturesState,
  fixturesState => (
    !!fixturesState.isAllItemsFinished
  ),
);

export const getFixturesEntities = createSelector(
  getFixturesState,
  fixturesState => (
    fixturesState.entities || {}
  ),
);

export const getFixturesIds = createSelector(
  getFixturesState,
  fixturesState => (
    fixturesState.ids || []
  ),
);

export const getFixtures = createSelector(
  getFixturesEntities,
  getFixturesIds,
  (entities, ids) => (
    ids.map(id => (
      entities[id]
    ))
  ),
);
