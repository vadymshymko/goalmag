import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const initialState = {
  entities: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isLoaded: false,
};

const products = createReducer(initialState, {
  [FETCH_COUNTRIES_REQUEST]: state => ({
    ...state,
    isFetching: true,
    isRequestFailed: false,
  }),

  [FETCH_COUNTRIES_SUCCESS]: (state, action) => ({
    ...state,
    entities: action.payload.entities,
    ids: action.payload.ids,
    isFetching: false,
    isLoaded: true,
  }),

  [FETCH_COUNTRIES_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isRequestFailed: true,
  }),
});

export default products;
