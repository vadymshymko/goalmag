import { squads as types } from 'types';

const initialState = {
  byId: {},
  allIds: [],
};

const squad = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_SQUAD_REQUEST:
      return {
        ...state,
        isFetching: true,
        isInitialized: false,
        isRequestFailed: false,
      };

    case types.FETCH_SQUAD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isInitialized: true,
      };

    case types.FETCH_SQUAD_FAILURE:
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

const squads = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SQUAD_REQUEST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: squad(state[action.payload.id], action),
        },
        allIds: [
          ...state.allIds,
          action.payload.id,
        ],
      };

    case types.FETCH_SQUAD_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: squad(state[action.payload.id], action),
        },
      };

    case types.FETCH_SQUAD_FAILURE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: squad(state[action.payload.id], action),
        },
      };

    default:
      return state;
  }
};

export default squads;