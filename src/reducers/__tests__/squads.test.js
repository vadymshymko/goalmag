import { squads as types } from 'types';
import reducer from '../squads';

const initialState = {
  entities: {},
  ids: [],
};

const initializedEntity = {
  players: [
    {
      id: 1,
      name: 'name',
    },
  ],
  isFetching: false,
  isInitialized: true,
};

const fetchingEntity = {
  id: 1,
  isFetching: true,
  isRequestFailed: false,
  isInitialized: false,
};

const failedEntity = {
  isFetching: false,
  isRequestFailed: true,
  isInitialized: true,
};

describe('fixtures reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return fetchingState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_SQUAD_REQUEST,
      payload: {
        id: 1,
      },
    })).toEqual({
      entities: {
        1: fetchingEntity,
      },
      ids: [1],
    });
  });

  it('should return initializedState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_SQUAD_SUCCESS,
      payload: {
        id: 1,
        players: [
          {
            id: 1,
            name: 'name',
          },
        ],
      },
    })).toEqual({
      entities: {
        1: initializedEntity,
      },
      ids: [],
    });
  });

  it('should return failureState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_SQUAD_FAILURE,
      payload: {
        id: 1,
      },
    })).toEqual({
      entities: {
        1: failedEntity,
      },
      ids: [],
    });
  });
});
