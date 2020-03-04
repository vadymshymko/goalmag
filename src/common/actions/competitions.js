import { normalize } from 'normalizr';

import { callApi } from 'utils';

import {
  FETCH_COMPETITIONS_REQUEST,
  FETCH_COMPETITIONS_SUCCESS,
  FETCH_COMPETITIONS_FAILURE,
} from 'actionsTypes';

import { competitionsSchema } from 'schemas';

import {
  getCompetitionsIsFetching,
  getCompetitionsIsInitialized,
} from 'selectors';

const shouldFetchCompetitions = state => {
  return !(
    getCompetitionsIsFetching(state) || getCompetitionsIsInitialized(state)
  );
};

export const fetchCompetitions = () => async (dispatch, getState) => {
  try {
    const currentState = getState();

    if (!shouldFetchCompetitions(currentState)) {
      return true;
    }

    dispatch({
      type: FETCH_COMPETITIONS_REQUEST,
      payload: {},
    });

    const response = await callApi('competitions');
    const normalizedResponse = normalize(response, competitionsSchema);

    return dispatch({
      type: FETCH_COMPETITIONS_SUCCESS,
      payload: {
        entities: normalizedResponse.entities.competitions,
        ids: normalizedResponse.result,
      },
    });
  } catch (error) {
    console.error('fetchCompetitions error: ', error);

    return dispatch({
      type: FETCH_COMPETITIONS_FAILURE,
      payload: {},
    });
  }
};

export default fetchCompetitions;
