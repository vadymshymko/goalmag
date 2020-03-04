import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const initialState = {};

const teams = createReducer(initialState, {
  [FETCH_TEAM_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      isInitialized: false,
      ...(state[action.payload.id] || {}),
      errorCode: null,
      id: action.payload.id,
      isFetching: true,
      isRequestFailed: false,
    },
  }),

  [FETCH_TEAM_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      ...action.payload,
      isFetching: false,
      isInitialized: true,
    },
  }),

  [FETCH_TEAM_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      errorCode: action.payload.errorCode,
      isFetching: false,
      isRequestFailed: true,
      isInitialized: true,
    },
  }),
});

export default teams;
