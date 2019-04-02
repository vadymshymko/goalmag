import { createSelector } from 'reselect';
import moment from 'moment';

const FIXTURES_STATUSES_REGEXP = /(scheduled|live|finished|postponed|suspended|canceled)$/;

export const FIXTURES_STATUSES_ITEMS = [
  {
    label: 'Live',
    value: 'live',
  },
  {
    label: 'Finished',
    value: 'finished',
  },
  {
    label: 'Canceled',
    value: 'canceled',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
  {
    label: 'Postponed',
    value: 'postponed',
  },
  {
    label: 'Sheduled',
    value: 'scheduled',
  },
];

export const getFixtures = state => state.fixtures;

export const getFixturesFilters = createSelector(
  getFixtures,
  fixtures => fixtures.filters,
);

export const getFixturesFilterStateById = createSelector(
  getFixturesFilters,
  (state, id) => id,
  (fixturesFilters, id) => (
    fixturesFilters[id] || {}
  ),
);

export const getFixturesFilterLastUpdated = createSelector(
  getFixturesFilterStateById,
  fixturesFilterState => (
    fixturesFilterState.lastUpdated || 0
  ),
);

export const getFixturesFilterIsFetching = createSelector(
  getFixturesFilterStateById,
  fixturesFilterState => (
    !!fixturesFilterState.isFetching
  ),
);

export const getFixturesFilterIsInitialized = createSelector(
  getFixturesFilterStateById,
  fixturesFilterState => (
    !!fixturesFilterState.isInitialized
  ),
);

export const getFixturesFilterIsAllFinished = createSelector(
  getFixturesFilterStateById,
  fixturesFilterState => (
    !!fixturesFilterState.isAllItemsFinished
  ),
);

export const getFixturesEntities = createSelector(
  getFixtures,
  fixtures => (
    fixtures.entities || {}
  ),
);

export const getFixturesIds = createSelector(
  getFixtures,
  fixtures => (
    fixtures.ids || []
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

export const getFixturesItemsToShow = createSelector(
  getFixturesItems,
  (state, filters) => filters,
  (items, filters) => items.filter((item) => {
    const isVisibleByCompetition = filters.competitionId
      ? parseInt(item.competition.id, 10) === parseInt(filters.competitionId, 10)
      : true;
    const isVisibleByDate = moment(item.utcDate).local().format('YYYY-MM-DD') === filters.date;
    const isVisibleByStatus = filters.status === 'live'
      ? item.status.toLowerCase() === 'in_play' || item.status.toLowerCase() === 'paused'
      : (
        !FIXTURES_STATUSES_REGEXP.test(filters.status)
        || (
          FIXTURES_STATUSES_REGEXP.test(filters.status)
          && item.status.toLowerCase() === filters.status
        )
      );

    return isVisibleByCompetition && isVisibleByDate && isVisibleByStatus;
  }),
);
