import { normalize } from 'normalizr';

import { callApi } from 'utils';

import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
  FETCH_MATCH_REQUEST,
  FETCH_MATCH_SUCCESS,
  FETCH_MATCH_FAILURE,
  FETCH_MATCH_COMMENTARIES_REQUEST,
  FETCH_MATCH_COMMENTARIES_SUCCESS,
  FETCH_MATCH_COMMENTARIES_FAILURE,
} from 'actionsTypes';

import { matchesSchema, matchSchema } from 'schemas';

import {
  getMatchesIsFetching,
  getDate,
  getCompetitionId,
  getMatch,
  getMatchId,
} from 'selectors';

const shouldFetchMatches = (state, params) => {
  return !getMatchesIsFetching(state, params);
};

export const fetchMatches = params => async (dispatch, getState) => {
  try {
    const currentState = getState();

    if (!shouldFetchMatches(currentState, params)) {
      return true;
    }

    const matchesDate = getDate(currentState, params);
    const matchesCompetition = getCompetitionId(currentState, params);

    dispatch({
      type: FETCH_MATCHES_REQUEST,
      payload: {},
    });

    const response = await callApi(
      `matches?match_date=${matchesDate}${
        matchesCompetition ? `&comp_id=${matchesCompetition}` : ''
      }`
    );
    const normalizedResponse = normalize(response, matchesSchema);

    return dispatch({
      type: FETCH_MATCHES_SUCCESS,
      payload: {
        entities: normalizedResponse.entities.matches,
        ids: normalizedResponse.result,
      },
    });
  } catch (error) {
    console.error('fetchMatches error: ', error);

    return dispatch({
      type: FETCH_MATCHES_FAILURE,
      payload: {},
    });
  }
};

const shouldFetchMatch = (currentState, params) => {
  const matchState = getMatch(currentState, params);

  return !matchState || (!matchState.isFetching && matchState.status !== 'FT');
};

export const fetchMatch = params => async (dispatch, getState) => {
  const currentState = getState();
  const matchId = getMatchId(currentState, params);

  try {
    if (!matchId || !shouldFetchMatch(currentState, params)) {
      return true;
    }

    dispatch({
      type: FETCH_MATCH_REQUEST,
      payload: {
        id: matchId,
      },
    });

    const response = await callApi(`matches/${matchId}`);
    const normalizedResponse = normalize(response[0], matchSchema);

    return dispatch({
      type: FETCH_MATCH_SUCCESS,
      payload: normalizedResponse.entities.matches[matchId],
    });
  } catch (error) {
    console.log('fetchMatch error', error);

    return dispatch({
      type: FETCH_MATCH_FAILURE,
      payload: {
        id: matchId,
      },
    });
  }
};

const shouldFetchMatchCommentaries = (currentState, params) => {
  const matchState = getMatch(currentState, params);

  return (
    !matchState ||
    !matchState.commentaries ||
    (!matchState.commentaries.isFetching && matchState.status !== 'FT')
  );
};

export const fetchMatchCommentaries = params => async (dispatch, getState) => {
  const currentState = getState();
  const { matchId } = params.match.params;

  try {
    if (!matchId || !shouldFetchMatchCommentaries(currentState, params)) {
      return true;
    }

    dispatch({
      type: FETCH_MATCH_COMMENTARIES_REQUEST,
      payload: {
        matchId,
      },
    });

    const [response] = await callApi(`commentaries/${matchId}`);

    return dispatch({
      type: FETCH_MATCH_COMMENTARIES_SUCCESS,
      payload: {
        ...response,
        matchId,
      },
    });
  } catch (error) {
    console.log('fetchMatchCommentaires error', error);

    return dispatch({
      type: FETCH_MATCH_COMMENTARIES_FAILURE,
      payload: {
        matchId,
      },
    });
  }
};
