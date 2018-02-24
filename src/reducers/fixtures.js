import { fixtures as types } from 'types';

const initialState = {
  entities: {},
  ids: [],
  initializedEndpoints: [],
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
        entities: {
          ...state.entities,
          ...action.payload.entities,
        },
        ids: [
          ...new Set([
            ...state.ids,
            ...action.payload.ids,
          ]),
        ],
        initializedEndpoints: action.payload.isEndpointInitialized
          ? [
            ...state.initializedEndpoints,
            action.payload.endpoint,
          ]
          : state.initializedEndpoints,
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
