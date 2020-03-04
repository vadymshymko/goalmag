import {
  FETCH_COMPETITIONS_REQUEST,
  FETCH_COMPETITIONS_SUCCESS,
  FETCH_COMPETITIONS_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const initialState = {
  entities: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const competitions = createReducer(initialState, {
  [FETCH_COMPETITIONS_REQUEST]: state => ({
    ...state,
    isFetching: true,
    isRequestFailed: false,
  }),

  [FETCH_COMPETITIONS_SUCCESS]: (state, action) => ({
    ...state,
    entities: action.payload.entities,
    ids: action.payload.ids,
    isFetching: false,
    isInitialized: true,
  }),

  [FETCH_COMPETITIONS_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),
});

export default competitions;
