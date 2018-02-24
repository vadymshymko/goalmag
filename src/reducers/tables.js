import { tables as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
};

export const table = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TABLE_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        isFetching: true,
        isRequestFailed: false,
        isInitialized: false,
      };

    case types.FETCH_TABLE_SUCCESS:
      return {
        ...state,
        ...action.payload.table,
        isFetching: false,
        isInitialized: true,
      };

    case types.FETCH_TABLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isRequestFailed: true,
        isInitialized: true,
      };

    default:
      return state;
  }
};

const tables = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TABLE_REQUEST:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: table(state[action.payload.id], action),
        },
        ids: [
          ...state.ids,
          action.payload.id,
        ],
      };

    case types.FETCH_TABLE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: table(state[action.payload.id], action),
        },
      };

    case types.FETCH_TABLE_FAILURE:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: table(state[action.payload.id], action),
        },
      };

    default:
      return state;
  }
};

export default tables;
