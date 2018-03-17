import { createReducer } from 'utils';
import { tables as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
};

const table = createReducer({}, {
  [types.FETCH_TABLE_REQUEST]: (state, action) => ({
    ...state,
    id: action.payload.id,
    isFetching: true,
    isInitialized: false,
    isRequestFailed: false,
  }),

  [types.FETCH_TABLE_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload.table,
    isFetching: false,
    isInitialized: true,
  }),

  [types.FETCH_TABLE_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isInitialized: true,
    isRequestFailed: true,
  }),
});

const tables = createReducer(initialState, {
  [types.FETCH_TABLE_REQUEST]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: table(state[action.payload.id], action),
    },
    ids: [
      ...state.ids,
      action.payload.id,
    ],
  }),

  [types.FETCH_TABLE_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: table(state[action.payload.id], action),
    },
  }),

  [types.FETCH_TABLE_FAILURE]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: table(state[action.payload.id], action),
    },
  }),
});

export default tables;
