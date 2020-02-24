import { normalize } from 'normalizr';

import { callApi } from 'utils';

import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
} from 'actionsTypes';

import { matchesSchema } from 'schemas';
import {
  getMatchesIsFetching,
  getMatchesDateFilter,
  getMatchesLastUpdated,
} from 'selectors';

const shouldFetchMatches = (state, params) => {
  return !(
    getMatchesIsFetching(state, params) ||
    getMatchesLastUpdated(state, params) - Date.now() > 6000
  );
};

export const fetchMatches = params => async (dispatch, getState) => {
  const currentState = getState();

  if (!shouldFetchMatches(currentState, params)) {
    return true;
  }

  const date = getMatchesDateFilter(currentState, params);

  try {
    dispatch({
      type: FETCH_MATCHES_REQUEST,
      payload: {
        date,
      },
    });
    const response = await callApi(`matches?match_date=${date}`);
    const normalizedResponse = normalize(response, matchesSchema);

    return dispatch({
      type: FETCH_MATCHES_SUCCESS,
      payload: {
        date,
        entities: normalizedResponse.entities.matches,
        ids: normalizedResponse.result,
        lastUpdated: Date.now(),
      },
    });
  } catch (error) {
    console.error('fetchMatches error: ', error);

    return dispatch({
      type: FETCH_MATCHES_FAILURE,
      payload: {
        date,
        lastUpdated: Date.now(),
      },
    });
  }
};

export default fetchMatches;
