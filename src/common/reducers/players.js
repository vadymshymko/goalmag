import {
  FETCH_PLAYER_REQUEST,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYER_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const initialState = {};

const players = createReducer(initialState, {
  [FETCH_PLAYER_REQUEST]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      isInitialized: false,
      ...(state[action.payload.id] || {}),
      info: {
        ...((state[action.payload.id] || {}).info || {}),
        id: action.payload.id,
      },
      id: action.payload.id,
      isFetching: true,
      isRequestFailed: false,
    },
  }),

  [FETCH_PLAYER_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      info: {
        ...state[action.payload.id].info,
        ...action.payload.info,
      },
      isFetching: false,
      isInitialized: true,
    },
  }),

  [FETCH_PLAYER_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      isFetching: false,
      isRequestFailed: true,
      isInitialized: true,
    },
  }),
});

export default players;
