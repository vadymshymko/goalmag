import { competitions as types } from 'types';
import { callApi } from 'utils';

const getCompetitionsRequest = () => ({
  type: types.GET_COMPETITIONS_REQUEST,
});

const getCompetitionsSuccess = items => ({
  type: types.GET_COMPETITIONS_SUCCESS,
  payload: {
    items,
  },
});

const getCompetitionsFailure = () => ({
  type: types.GET_COMPETITIONS_FAILURE,
});

export const getCompetitions = () => (dispatch, getState) => {
  const currentState = getState().competitions;

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(getCompetitionsRequest());

  return callApi('competitions').then(json => (
    dispatch(getCompetitionsSuccess(json))
  )).catch((error) => {
    dispatch(getCompetitionsFailure());
    throw error;
  });
};

export default getCompetitions;
