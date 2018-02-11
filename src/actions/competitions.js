import { normalize } from 'normalizr';
import { competitions as types } from 'types';
import { competitions as schema } from 'schemas';
import { callApi } from 'utils';

export const fetchCompetitionsRequest = () => ({
  type: types.FETCH_COMPETITIONS_REQUEST,
});

export const fetchCompetitionsSuccess = payload => ({
  type: types.FETCH_COMPETITIONS_SUCCESS,
  payload,
});

export const fetchCompetitionsFailure = () => ({
  type: types.FETCH_COMPETITIONS_FAILURE,
});

export const fetchCompetitions = () => (dispatch, getState) => {
  const currentState = getState().competitions;

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(fetchCompetitionsRequest());

  return callApi('competitions').then((json) => {
    const {
      entities: {
        competitions: items = {},
      },
      result: ids = [],
    } = normalize(json, schema);

    dispatch(fetchCompetitionsSuccess({
      items,
      ids,
    }));
  }).catch((error) => {
    dispatch(fetchCompetitionsFailure());
    throw error;
  });
};
