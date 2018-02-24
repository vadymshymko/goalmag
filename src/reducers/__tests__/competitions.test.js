import { competitions as types } from 'types';
import reducer from '../competitions';

const initialState = {
  entities: {},
  ids: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const fetchingState = {
  ...initialState,
  isFetching: true,
};

const entities = {
  1: {
    id: 1,
    caption: '1 caption',
  },
  2: {
    id: 2,
    caption: '2 caption',
  },
};

const ids = [1, 2];

const initializedState = {
  ...initialState,
  entities,
  ids,
  isInitialized: true,
};

const failureState = {
  ...initialState,
  isInitialized: true,
  isRequestFailed: true,
};

describe('competitions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return fetchingState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_COMPETITIONS_REQUEST,
    })).toEqual(fetchingState);
  });

  it('should return initializedState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_COMPETITIONS_SUCCESS,
      payload: {
        entities,
        ids,
      },
    })).toEqual(initializedState);
  });

  it('should return failureState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_COMPETITIONS_FAILURE,
    })).toEqual(failureState);
  });
});
