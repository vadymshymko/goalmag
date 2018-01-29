import { competitions as types } from 'types/';

const initialState = {
  items: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const competitions = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMPETITIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRequestFailed: false,
      };

    case types.GET_COMPETITIONS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isInitialized: true,
      };

    case types.GET_COMPETITIONS_FAILURE:
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

export default competitions;
