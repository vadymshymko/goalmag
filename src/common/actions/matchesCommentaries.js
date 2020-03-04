import { callApi } from 'utils';

import {
  FETCH_MATCH_COMMENTARIES_REQUEST,
  FETCH_MATCH_COMMENTARIES_SUCCESS,
  FETCH_MATCH_COMMENTARIES_FAILURE,
} from 'actionsTypes';

import { getMatchCommentaries, getMatch, getMatchId } from 'selectors';

const normalizeMatchCommentaries = ({
  matchInfo = {},
  ...matchCommentaries
} = {}) => {
  return {
    ...matchInfo,
    ...matchCommentaries,
    matchStats: {
      localteam: {},
      visitorteam: {},
      ...matchCommentaries.matchStats,
    },
  };
};

const shouldFetchMatchCommentaries = (currentState, params) => {
  const matchState = getMatch(currentState, params);
  const matchCommentariesState = getMatchCommentaries(currentState, params);

  return !matchCommentariesState.isFetching && matchState.status !== 'FT';
};

export const fetchMatchCommentaries = params => async (dispatch, getState) => {
  const currentState = getState();
  const matchId = getMatchId(currentState, params);

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
        ...normalizeMatchCommentaries(response),
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

export default fetchMatchCommentaries;
