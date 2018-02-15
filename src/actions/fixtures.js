import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import { getIsFixturesFetching, getFixturesInitializedFilters } from 'selectors';
import { callApi } from 'utils';

const fetchFixturesRequest = () => ({
  type: types.FETCH_FIXTURES_REQUEST,
});

const fetchFixturesSuccess = payload => ({
  type: types.FETCH_FIXTURES_SUCCESS,
  payload,
});

const fetchFixturesFailure = () => ({
  type: types.FETCH_FIXTURES_FAILURE,
});

export const fetchFixtures = ({
  competitionId,
  matchday,
  dateFrom,
  dateTo,
} = {}) => (dispatch, getState) => {
  if (!(competitionId && matchday) && !(dateFrom && dateTo)) {
    throw new Error('Invalid arguments passed');
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
  const requestDateFilter = (dateFrom && dateTo)
    ? `&timeFrameStart=${dateFrom}&timeFrameEnd=${dateTo}`
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
      ids,
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
