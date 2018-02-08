import { competitions as types } from 'types';
import { callApi } from 'utils';

const fetchCompetitionsRequest = () => ({
  type: types.FETCH_COMPETITIONS_REQUEST,
});

const fetchCompetitionsSuccess = items => ({
  type: types.FETCH_COMPETITIONS_SUCCESS,
  payload: {
    items,
  },
});

const fetchCompetitionsFailure = () => ({
  type: types.FETCH_COMPETITIONS_FAILURE,
});

export const fetchCompetitions = () => (dispatch, getState) => {
  const currentState = getState().competitions;

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(fetchCompetitionsRequest());

  return callApi('competitions').then(json => (
    dispatch(fetchCompetitionsSuccess(json))
  )).catch((error) => {
    dispatch(fetchCompetitionsFailure());
    throw error;
  });
};

export default fetchCompetitions;
