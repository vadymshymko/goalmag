import { fixtures as types } from 'types';
import { callApi } from 'utils';

const fetchFixturesRequest = () => ({
  type: types.FETCH_FIXTURES_REQUEST,
});

const fetchFixturesSuccess = items => ({
  type: types.FETCH_FIXTURES_SUCCESS,
  payload: {
    items,
  },
});

const fetchFixturesFailure = () => ({
  type: types.FETCH_FIXTURES_FAILURE,
});

export const fetchFixtures = () => (dispatch, getState) => {
  const currentState = getState().fixtures;

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(fetchFixturesRequest());

  return callApi('fixtures?timeFrame=n1').then(json => (
    dispatch(fetchFixturesSuccess(json.fixtures))
  )).catch((error) => {
    dispatch(fetchFixturesFailure());
    throw error;
  });
};

export default fetchFixtures;
