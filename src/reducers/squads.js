import { createReducer } from 'utils';
import { squads as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
};

const squad = createReducer({}, {
  [types.FETCH_SQUAD_REQUEST]: (state, action) => ({
    ...state,
    id: action.payload.id,
    isFetching: true,
    isInitialized: false,
    isRequestFailed: false,
  }),

  [types.FETCH_SQUAD_SUCCESS]: (state, action) => ({
    ...state,
    players: action.payload.players,
    isFetching: false,
    isInitialized: true,
  }),

  [types.FETCH_SQUAD_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isInitialized: true,
    isRequestFailed: true,
  }),
});

const squads = createReducer(initialState, {
  [types.FETCH_SQUAD_REQUEST]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: squad(state[action.payload.id], action),
    },
    ids: [
      ...state.ids,
      action.payload.id,
    ],
  }),

  [types.FETCH_SQUAD_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: squad(state[action.payload.id], action),
    },
  }),

  [types.FETCH_SQUAD_FAILURE]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: squad(state[action.payload.id], action),
    },
  }),
});

export default squads;
