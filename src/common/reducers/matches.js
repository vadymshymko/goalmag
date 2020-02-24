import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const matchesGroupInitialState = {
  date: null,
  entities: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
  lastUpdated: 0,
};

const initialState = {};

const matches = createReducer(initialState, {
  [FETCH_MATCHES_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.date]: {
      ...(state[action.payload.date] || matchesGroupInitialState),
      date: action.payload.date,
      isFetching: true,
      isRequestFailed: false,
    },
  }),

  [FETCH_MATCHES_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.date]: {
      ...state[action.payload.date],
      entities: action.payload.entities,
      ids: action.payload.ids,
      lastUpdated: action.payload.lastUpdated,
      isFetching: false,
      isInitialized: true,
    },
  }),

  [FETCH_MATCHES_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.date]: {
      ...state[action.payload.date],
      lastUpdated: action.payload.lastUpdated,
      isFetching: false,
      isRequestFailed: true,
      isInitialized: true,
    },
  }),
});

export default matches;
