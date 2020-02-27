import deepmerge from 'deepmerge';

import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
  FETCH_MATCH_REQUEST,
  FETCH_MATCH_SUCCESS,
  FETCH_MATCH_FAILURE,
  FETCH_MATCH_COMMENTARIES_REQUEST,
  FETCH_MATCH_COMMENTARIES_SUCCESS,
  FETCH_MATCH_COMMENTARIES_FAILURE,
} from 'actionsTypes';

import createReducer from './createReducer';

const commentariesInitialState = {
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const matchInitialState = {
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const matchesInitialState = {
  entities: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const matchCommentaries = createReducer(commentariesInitialState, {
  [FETCH_MATCH_COMMENTARIES_REQUEST]: state => ({
    ...state,
    isFetching: true,
    isRequestFailed: false,
  }),

  [FETCH_MATCH_COMMENTARIES_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    isInitialized: true,
  }),

  [FETCH_MATCH_COMMENTARIES_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),
});

const match = createReducer(matchInitialState, {
  [FETCH_MATCH_REQUEST]: state => ({
    ...state,
    isFetching: true,
    isRequestFailed: false,
  }),

  [FETCH_MATCH_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    isInitialized: true,
  }),

  [FETCH_MATCH_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),

  [FETCH_MATCH_COMMENTARIES_REQUEST]: (state, action) => ({
    ...state,
    commentaries: matchCommentaries(state.commentaries || {}, action),
  }),

  [FETCH_MATCH_COMMENTARIES_SUCCESS]: (state, action) => ({
    ...state,
    commentaries: matchCommentaries(state.commentaries || {}, action),
  }),

  [FETCH_MATCH_COMMENTARIES_FAILURE]: (state, action) => ({
    ...state,
    commentaries: matchCommentaries(state.commentaries || {}, action),
  }),
});

const matches = createReducer(matchesInitialState, {
  [FETCH_MATCHES_REQUEST]: state => ({
    ...state,
    isFetching: true,
    isRequestFailed: false,
  }),

  [FETCH_MATCHES_SUCCESS]: (state, action) => ({
    ...state,
    entities: deepmerge(state.entities, action.payload.entities),
    ids: [...new Set([...state.ids, ...action.payload.ids])],
    isFetching: false,
    isInitialized: true,
  }),

  [FETCH_MATCHES_FAILURE]: state => ({
    ...state,
    isFetching: false,
    isRequestFailed: true,
    isInitialized: true,
  }),

  [FETCH_MATCH_REQUEST]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: match(
        state.entities[action.payload.id] || {},
        action
      ),
    },
    ids: [...new Set([...state.ids, action.payload.id])],
  }),

  [FETCH_MATCH_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: match(
        state.entities[action.payload.id] || {},
        action
      ),
    },
  }),

  [FETCH_MATCH_FAILURE]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.id]: match(
        state.entities[action.payload.id] || {},
        action
      ),
    },
  }),

  [FETCH_MATCH_COMMENTARIES_REQUEST]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.matchId]: match(
        state.entities[action.payload.matchId] || {},
        action
      ),
    },
    ids: [...new Set([...state.ids, action.payload.matchId])],
  }),

  [FETCH_MATCH_COMMENTARIES_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.matchId]: match(
        state.entities[action.payload.matchId] || {},
        action
      ),
    },
  }),

  [FETCH_MATCH_COMMENTARIES_FAILURE]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.matchId]: match(
        state.entities[action.payload.matchId] || {},
        action
      ),
    },
  }),
});

export default matches;
