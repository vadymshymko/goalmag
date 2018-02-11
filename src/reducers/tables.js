import { tables as types } from 'types';

export const table = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TABLE_REQUEST:
      return {
        ...state,
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

const tables = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TABLE_REQUEST:
      return {
        ...state,
        [action.payload.id]: table(state[action.payload.id], action),
      };

    case types.FETCH_TABLE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: table(state[action.payload.id], action),
      };

    case types.FETCH_TABLE_FAILURE:
      return {
        ...state,
        [action.payload.id]: table(state[action.payload.id], action),
      };

    default:
      return state;
  }
};

export default tables;
