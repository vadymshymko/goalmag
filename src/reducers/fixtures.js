import { createReducer } from 'utils';
import { fixtures as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
  initializedEndpoints: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const fixtures = createReducer(initialState, {
  [types.FETCH_FIXTURES_REQUEST]: state => ({
    ...state,
    isFetching: true,
    isRequestFailed: false,
  }),

  [types.FETCH_FIXTURES_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      ...action.payload.entities,
    },
    ids: [
      ...new Set([
        ...state.ids,
        ...action.payload.ids,
      ]),
    ],
    initializedEndpoints: action.payload.isEndpointInitialized
      ? [
        ...state.initializedEndpoints,
        action.payload.endpoint,
      ]
      : state.initializedEndpoints,
    isFetching: false,
    isInitialized: true,
  }),

  [types.FETCH_FIXTURES_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),
});

export default fixtures;
