import { createReducer } from 'utils';
import { standings as types } from 'types';

const standingsInitialState = {};
const standingsItemInitialState = {
  lastUpdated: 0,
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
  items: [],
};

const standingsItem = createReducer(standingsItemInitialState, {
  [types.FETCH_STANDINGS_REQUEST]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: true,
    isRequestFailed: false,
  }),

  [types.FETCH_STANDINGS_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    isInitialized: true,
  }),

  [types.FETCH_STANDINGS_FAILURE]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),
});

const standings = createReducer(standingsInitialState, {
  [types.FETCH_STANDINGS_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.id]: standingsItem(state[action.payload.id], action),
  }),

  [types.FETCH_STANDINGS_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.id]: standingsItem(state[action.payload.id], action),
  }),

  [types.FETCH_STANDINGS_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.id]: standingsItem(state[action.payload.id], action),
  }),
});

export default standings;
