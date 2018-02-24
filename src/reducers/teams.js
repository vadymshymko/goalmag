import { teams as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
};

const team = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TEAM_REQUEST:
      return {
        ...state,
        isFetching: true,
        isInitialized: false,
        isRequestFailed: false,
      };

    case types.FETCH_TEAM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isInitialized: true,
      };

    case types.FETCH_TEAM_FAILURE:
      return {
        ...state,
        isFetching: false,
        isInitialized: true,
        isRequestFailed: true,
      };

    default:
      return state;
  }
};

const teams = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TEAM_REQUEST:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: team(state[action.payload.id], action),
        },
        ids: [
          ...state.ids,
          action.payload.id,
        ],
      };

    case types.FETCH_TEAM_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: team(state[action.payload.id], action),
        },
      };

    case types.FETCH_TEAM_FAILURE:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: team(state[action.payload.id], action),
        },
      };

    default:
      return state;
  }
};

export default teams;
