import moment from 'moment';
import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import {
  getIsFixturesFetching,
  getIsFixturesInitialized,
} from 'selectors';
import { callApi } from 'utils';

export const fetchFixturesRequest = payload => ({
  type: types.FETCH_FIXTURES_REQUEST,
  payload,
});

export const fetchFixturesSuccess = payload => ({
  type: types.FETCH_FIXTURES_SUCCESS,
  payload,
});

export const fetchFixturesFailure = payload => ({
  type: types.FETCH_FIXTURES_FAILURE,
  payload,
});

export const fetchFixtures = ({
  competitionId,
  date,
} = {}) => (dispatch, getState) => {
  if (!date) {
    return Promise.reject(new Error('invalid date or competitionId'));
  }

  const state = getState();
  const requestDate = moment(date).format('YYYY-MM-DD');
  const requestPath = `${competitionId ? `competitions/${competitionId}` : ''}/matches?dateFrom=${requestDate}&dateTo=${requestDate}`;
  const isFetching = getIsFixturesFetching(state, requestPath);
  const isInitialized = getIsFixturesInitialized(state, requestPath);

  if (isFetching || isInitialized) {
    return Promise.resolve();
  }

  dispatch(fetchFixturesRequest({
    requestPath,
  }));

  return callApi(requestPath).then((json) => {
    const {
      entities: {
        fixtures: entities = {},
      },
      result: ids = [],
    } = normalize(json.matches, schema);

    const isRequestPathInitialized = json.matches.filter(match => match.status.toLowerCase() === 'finished').length === json.matches.length;

    return dispatch(fetchFixturesSuccess({
      entities,
      ids,
      requestPath,
      isInitialized: isRequestPathInitialized,
    }));
  }).catch((error) => {
    dispatch(fetchFixturesFailure({
      requestPath,
    }));

    throw error;
  });
};

export default fetchFixtures;
