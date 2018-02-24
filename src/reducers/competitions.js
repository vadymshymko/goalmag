import { competitions as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const competitions = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMPETITIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRequestFailed: false,
      };

    case types.FETCH_COMPETITIONS_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.payload.entities,
        },
        ids: [
          ...state.ids,
          ...action.payload.ids,
        ],
        isFetching: false,
        isInitialized: true,
      };

    case types.FETCH_COMPETITIONS_FAILURE:
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
