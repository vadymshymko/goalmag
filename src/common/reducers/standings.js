import {
  FETCH_COMPETITION_STANDINGS_REQUEST,
  FETCH_COMPETITION_STANDINGS_SUCCESS,
  FETCH_COMPETITION_STANDINGS_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const initialState = {};

const standings = createReducer(initialState, {
  [FETCH_COMPETITION_STANDINGS_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.competitionId]: {
      isInitialized: false,
      ...(state[action.payload.competitionId] || {}),
      competitionId: action.payload.competitionId,
      isFetching: true,
      isRequestFailed: false,
    },
  }),

  [FETCH_COMPETITION_STANDINGS_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.competitionId]: {
      ...state[action.payload.competitionId],
      ...action.payload,
      isFetching: false,
      isInitialized: true,
    },
  }),

  [FETCH_COMPETITION_STANDINGS_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.competitionId]: {
      ...state[action.payload.competitionId],
      isFetching: false,
      isRequestFailed: true,
      isInitialized: true,
    },
  }),
});

export default standings;
