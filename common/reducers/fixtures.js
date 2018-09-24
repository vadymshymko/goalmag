import { createReducer } from 'utils';
import { fixtures as types } from 'types';

const fixturesInitialState = {};
const fixturesItemInitialState = {
  isAllItemsFinished: false,
  isFetching: false,
  isInitialized: false,
  isRequestFailed: false,
};

const fixturesItem = createReducer(fixturesItemInitialState, {
  [types.FETCH_FIXTURES_REQUEST]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: true,
    isRequestFailed: false,
  }),

  [types.FETCH_FIXTURES_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    isInitialized: true,
  }),

  [types.FETCH_FIXTURES_FAILURE]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),
});

const fixtures = createReducer(fixturesInitialState, {
  [types.FETCH_FIXTURES_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.id]: fixturesItem(state[action.payload.id], action),
  }),

  [types.FETCH_FIXTURES_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.id]: fixturesItem(state[action.payload.id], action),
  }),

  [types.FETCH_STANDINGS_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.id]: fixturesItem(state[action.payload.id], action),
  }),
});

export default fixtures;
