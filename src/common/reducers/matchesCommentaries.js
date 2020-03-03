import {
  FETCH_MATCH_COMMENTARIES_REQUEST,
  FETCH_MATCH_COMMENTARIES_SUCCESS,
  FETCH_MATCH_COMMENTARIES_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const initialState = {};

const matchCommentaries = createReducer(initialState, {
  [FETCH_MATCH_COMMENTARIES_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.matchId]: {
      isInitialized: false,
      ...(state[action.payload.matchId] || {}),
      isFetching: true,
      isRequestFailed: false,
    },
  }),

  [FETCH_MATCH_COMMENTARIES_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.matchId]: {
      ...state[action.payload.matchId],
      ...action.payload,
      isFetching: false,
      isInitialized: true,
    },
  }),

  [FETCH_MATCH_COMMENTARIES_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.matchId]: {
      ...state[action.payload.matchId],
      isFetching: false,
      isRequestFailed: true,
      isInitialized: true,
    },
  }),
});

export default matchCommentaries;
