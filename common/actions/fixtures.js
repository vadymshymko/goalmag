import moment from 'moment';
import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import {
  getIsFixturesFetching,
  getFixturesInitializedEndpoints,
} from 'selectors';
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
  date,
} = {}) => (dispatch, getState) => {
  if (!date) {
    return Promise.reject(new Error('invalid date'));
  }

  const state = getState();

  const isFetching = getIsFixturesFetching(state);
  const initializedEndpoints = getFixturesInitializedEndpoints(state);

  const requestPath = competitionId
    ? `competitions/${competitionId}/fixtures?`
    : 'fixtures?';
  const requestDateParams = `&timeFrameStart=${moment(date).format('YYYY-MM-DD')}&timeFrameEnd=${moment(date).format('YYYY-MM-DD')}`;

  const endpoint = `${requestPath}${requestDateParams}`;

  if (isFetching || initializedEndpoints.indexOf(endpoint) >= 0) {
    return Promise.resolve();
  }

  dispatch(fetchFixturesRequest());

  return callApi(endpoint).then((json) => {
    const {
      entities: {
        fixtures: entities = {},
      },
      result: ids = [],
    } = normalize(json.fixtures, schema);

    const isEndpointInitialized = json.fixtures.filter(item => (
      item.status.toLowerCase() !== 'finished'
    )).length === 0;

    return dispatch(fetchFixturesSuccess({
      entities,
      ids,
      endpoint,
      isEndpointInitialized,
    }));
  }).catch((error) => {
    dispatch(fetchFixturesFailure());
    throw error;
  });
};

export default fetchFixtures;
