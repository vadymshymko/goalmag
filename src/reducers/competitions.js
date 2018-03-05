import { createReducer } from 'utils';
import { competitions as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const competitions = createReducer(initialState, {
  [types.FETCH_COMPETITIONS_REQUEST]: state => ({
    ...state,
    isFetching: true,
    isRequestFailed: false,
  }),

  [types.FETCH_COMPETITIONS_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      ...action.payload.entities,
    },
    ids: [
      ...state.ids,
      ...action.payload.ids,
    ],
    isFetching: false,
    isInitialized: true,
  }),

  [types.FETCH_COMPETITIONS_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),
});

export default competitions;
