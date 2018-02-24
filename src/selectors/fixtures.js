import moment from 'moment';
import { createSelector } from 'reselect';

export const getAllFixtures = state => (
  state.fixtures.allIds.map(id => (
    state.fixtures.byId[id]
  ))
);

export const getFixturesByDate = createSelector(
  getAllFixtures,
  (state, { date }) => date,
  (fixtures, date) => fixtures.filter(item => (
    moment(item.date).startOf('day').format('YYYY-MM-DD') === date
  )),
);

export const getFixtures = createSelector(
  getFixturesByDate,
  (state, { competitionId }) => competitionId,
  (fixtures, competitionId) => fixtures.filter(item => (
    !competitionId
    || item.competitionId === competitionId
  )),
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
