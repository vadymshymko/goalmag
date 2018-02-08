import { competitions as types } from 'types';

const initialState = {
  items: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const competitionTables = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_COMPETITION_TABLE_REQUEST:
      if (state.id !== action.payload.competitionId) {
        return state;
      }

      return {
        ...state,
        tables: {
          ...(state.tables || {}),
          [action.payload.matchday]: {
            ...((state.tables || {})[action.payload.matchday] || {}),
            isFetching: true,
            isRequestFailed: false,
            isInitialized: false,
          },
        },
      };

    case types.FETCH_COMPETITION_TABLE_SUCCESS:
      if (state.id !== action.payload.competitionId) {
        return state;
      }

      return {
        ...state,
        tables: {
          ...(state.tables || {}),
          [action.payload.matchday]: {
            ...((state.tables || {})[action.payload.matchday] || {}),
            standings: action.payload.standings,
            isFetching: false,
            isInitialized: true,
          },
        },
      };

    case types.FETCH_COMPETITION_TABLE_FAILURE:
      if (state.id !== action.payload.competitionId) {
        return state;
      }

      return {
        ...state,
        tables: {
          ...(state.tables || {}),
          [action.payload.matchday]: {
            ...((state.tables || {})[action.payload.matchday] || {}),
            isFetching: false,
            isRequestFailed: true,
            isInitialized: true,
          },
        },
      };

    default:
      return state;
  }
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
        ...action.payload,
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

    case types.FETCH_COMPETITION_TABLE_REQUEST:
      return state.ids.map(id => (
        competitionTables(state.items[id], action)
      ));

    case types.FETCH_COMPETITION_TABLE_SUCCESS:
      return state.ids.map(id => (
        competitionTables(state.items[id], action)
      ));

    case types.FETCH_COMPETITION_TABLE_FAILURE:
      return state.ids.map(id => (
        competitionTables(state.items[id], action)
      ));

    default:
      return state;
  }
};

export default competitions;
