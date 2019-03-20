import { createReducer } from 'utils';
import { fixtures as types } from 'types';

const fixturesInitialState = {
  entities: {},
  ids: [],
  filters: {},
};

const fixtures = createReducer(fixturesInitialState, {
  [types.FETCH_FIXTURES_REQUEST]: (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      [action.payload.filterId]: {
        ...state.filters[action.payload.filterId] || {},
        isFetching: true,
        isRequestFailed: false,
      },
    },
  }),

  [types.FETCH_FIXTURES_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      ...action.payload.entities,
    },
    ids: [
      ...(new Set([
        ...state.ids,
        ...action.payload.ids,
      ])),
    ],
    filters: {
      ...state.filters,
      [action.payload.filterId]: {
        ...state.filters[action.payload.filterId] || {},
        isAllFinished: action.payload.isAllFinished,
        lastUpdated: action.payload.lastUpdated,
        isFetching: false,
        isInitialized: true,
      },
    },
  }),

  [types.FETCH_STANDINGS_FAILURE]: (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      [action.payload.filterId]: {
        ...state.filters[action.payload.filterId] || {},
        isFetching: false,
        isInitialized: true,
        isRequestFailed: true,
      },
    },
  }),
});

export default fixtures;
