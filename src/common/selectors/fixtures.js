import { createSelector } from 'reselect';

export const getFixtures = state => state.fixtures;

export const getFixturesById = createSelector(
  getFixtures,
  (state, id) => id,
  (fixtures, id) => (
    fixtures[id] || {}
  ),
);

export const getFixturesLastUpdated = createSelector(
  getFixturesById,
  fixturesState => (
    fixturesState.lastUpdated || 0
  ),
);

export const getIsFixturesFetching = createSelector(
  getFixturesById,
  fixturesState => (
    !!fixturesState.isFetching
  ),
);

export const getIsFixturesInitialized = createSelector(
  getFixturesById,
  fixturesState => (
    !!fixturesState.isInitialized
  ),
);

export const getIsFixturesAllItemsFinished = createSelector(
  getFixturesById,
  fixturesState => (
    !!fixturesState.isAllItemsFinished
  ),
);

export const getFixturesEntities = createSelector(
  getFixturesById,
  fixturesState => (
    fixturesState.entities || {}
  ),
);

export const getFixturesIds = createSelector(
  getFixturesById,
  fixturesState => (
    fixturesState.ids || []
  ),
);

export const getFixturesItems = createSelector(
  getFixturesEntities,
  getFixturesIds,
  (entities, ids) => (
    ids.map(id => (
      entities[id]
    ))
  ),
);
