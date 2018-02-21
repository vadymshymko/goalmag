import moment from 'moment';
import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import { getIsFixturesFetching, getFixturesInitializedFilters } from 'selectors';
import { callApi } from 'utils';

export const fetchFixturesRequest = () => ({
  type: types.FETCH_FIXTURES_REQUEST,
});

export const fetchFixturesSuccess = payload => ({
  type: types.FETCH_FIXTURES_SUCCESS,
  payload,
});

export const fetchFixturesFailure = () => ({
  type: types.FETCH_FIXTURES_FAILURE,
});

export const fetchFixtures = ({
  competitionId,
  matchday,
  date,
} = {}) => (dispatch, getState) => {
  if (!competitionId && !date) {
    throw new Error('invalid arguments');
  }

  const state = getState();
  const isCurrentlyFetching = getIsFixturesFetching(state);
  const initializedFilters = getFixturesInitializedFilters(state);

  const requestPathFilter = competitionId
    ? `competitions/${competitionId}/fixtures?`
    : 'fixtures?';
  const requestMatchdayFilter = competitionId && matchday
    ? `&matchday=${matchday}`
    : '';

  const requestDateFilter = date
    ? `&timeFrameStart=${moment(date).format('YYYY-MM-DD')}&timeFrameEnd=${moment(date).format('YYYY-MM-DD')}`
    : '';
  const requestFilter = `${requestPathFilter}${requestMatchdayFilter}${requestDateFilter}`;

  const isRequestFilterInitialized = initializedFilters.indexOf(requestFilter) >= 0;

  if (isCurrentlyFetching || isRequestFilterInitialized) {
    return Promise.resolve();
  }

  dispatch(fetchFixturesRequest());

  return callApi(requestFilter).then((json) => {
    const {
      entities: {
        fixtures: items = {},
      },
      result: ids = [],
    } = normalize(json.fixtures, schema);

    const notFinishedItemsCount = json.fixtures.filter(item => (
      item.status.toLowerCase() !== 'finished'
    )).length;

    return dispatch(fetchFixturesSuccess({
      items,
      ids: ids.filter(id => (
        state.fixtures.allIds.indexOf(id) < 0
      )),
      filter: notFinishedItemsCount > 0
        ? ''
        : requestFilter,
    }));
  }).catch((error) => {
    dispatch(fetchFixturesFailure());
    throw error;
  });
};

export default fetchFixtures;
