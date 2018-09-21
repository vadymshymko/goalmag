import { createReducer } from 'utils';
import { fixtures as types } from 'types';

const initialState = {};

const fixtures = createReducer(initialState, {
  [types.FETCH_FIXTURES_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.requestPath]: {
      ...(state[action.payload.requestPath] || {}),
      isFetching: true,
      isRequestFailed: false,
      isInitialized: false,
    },
  }),

  [types.FETCH_FIXTURES_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.requestPath]: {
      ...state[action.payload.requestPath],
      entities: {
        ...(state[action.payload.requestPath].entities || {}),
        ...action.payload.entities,
      },
      ids: [
        ...new Set([
          ...(state[action.payload.requestPath].ids || []),
          ...action.payload.ids,
        ]),
      ],
      isFetching: false,
      isInitialized: action.payload.isInitialized,
    },
  }),

  [types.FETCH_FIXTURES_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.requestPath]: {
      ...(state[action.payload.requestPath] || {}),
      isFetching: false,
      isRequestFailed: true,
      isInitialized: false,
    },
  }),
});

export default fixtures;
