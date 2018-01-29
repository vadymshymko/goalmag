import { competitions as types } from 'types';
import { fetch } from 'utils/';

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
  const currentState = getState();

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(getCompetitionsRequest());

  return fetch('//api.football-data.org/v1/competitions', {
    headers: {
      'X-Auth-Token': '724a8fd63a4742099053576de1bd4439',
    },
  }).then(json => (
    dispatch(getCompetitionsSuccess(json))
  )).catch((error) => {
    dispatch(getCompetitionsFailure());
    throw error;
  });
};

export default getCompetitions;
