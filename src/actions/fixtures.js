import { fixtures as types } from 'types';
import { callApi } from 'utils';

const getFixturesRequest = () => ({
  type: types.GET_FIXTURES_REQUEST,
});

const getFixturesSuccess = items => ({
  type: types.GET_FIXTURES_SUCCESS,
  payload: {
    items,
  },
});

const getFixturesFailure = () => ({
  type: types.GET_FIXTURES_FAILURE,
});

export const getFixtures = () => (dispatch, getState) => {
  const currentState = getState().fixtures;

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(getFixturesRequest());

  return callApi('fixtures?timeFrame=n1').then(json => (
    dispatch(getFixturesSuccess(json.fixtures))
  )).catch((error) => {
    dispatch(getFixturesFailure());
    throw error;
  });
};

export default getFixtures;
