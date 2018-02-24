import { normalize } from 'normalizr';
import { competitions as schema } from 'schemas';
import { competitions as types } from 'types';
import {
  getIsCompetitionsInitialized,
  getIsCompetitionsFetching,
} from 'selectors';
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
  const state = getState();

  const isFetching = getIsCompetitionsFetching(state);
  const isInitialized = getIsCompetitionsInitialized(state);

  if (isInitialized || isFetching) {
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

    return dispatch(fetchCompetitionsSuccess({
      items,
      ids,
    }));
  }).catch((error) => {
    dispatch(fetchCompetitionsFailure());
    throw error;
  });
};
