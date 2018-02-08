import { teams as types } from 'types';

const initialState = {};

const teams = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TEAM_REQUEST:
      return {
        ...state,
        [action.payload.teamId]: {
          info: state[action.payload.teamId]
            ? state[action.payload.teamId].info || {}
            : {},
          isFetching: true,
          isInitialized: false,
          isRequestFailed: false,
        },
      };

    case types.FETCH_TEAM_SUCCESS:
      return {
        ...state,
        [action.payload.teamId]: {
          info: action.payload.teamInfo,
          isFetching: false,
          isInitialized: true,
          isRequestFailed: false,
        },
      };

    case types.FETCH_TEAM_FAILURE:
      return {
        ...state,
        [action.payload.teamId]: {
          info: state[action.payload.teamId]
            ? state[action.payload.teamId].info || {}
            : {},
          isFetching: false,
          isInitialized: true,
          isRequestFailed: false,
        },
      };

    default:
      return state;
  }
};

export default teams;
