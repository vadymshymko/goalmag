import { fixtures as types } from 'types';

const initialState = {
  byId: [],
  allIds: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const fixtures = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_FIXTURES_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRequestFailed: false,
      };

    case types.FETCH_FIXTURES_SUCCESS:
      return {
        ...state,
        byId: action.payload.items,
        allIds: action.payload.ids,
        isFetching: false,
        isInitialized: true,
      };

    case types.FETCH_FIXTURES_FAILURE:
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

export default fixtures;
