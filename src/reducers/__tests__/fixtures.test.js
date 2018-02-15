import { fixtures as types } from 'types';
import reducer from '../fixtures';

const initialState = {
  byId: [],
  allIds: [],
  initializedFilters: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const fetchingState = {
  ...initialState,
  isFetching: true,
};

const items = {
  1: {
    id: 1,
    key: 'value 1',
  },
  2: {
    id: 2,
    key: 'value 2',
  },
};

const ids = [1, 2];

const initializedState = {
  ...initialState,
  byId: items,
  allIds: ids,
  isInitialized: true,
};

const failureState = {
  ...initialState,
  isInitialized: true,
  isRequestFailed: true,
};

describe('fixtures reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return fetchingState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_FIXTURES_REQUEST,
    })).toEqual(fetchingState);
  });

  it('should return initializedState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_FIXTURES_SUCCESS,
      payload: {
        items,
        ids,
      },
    })).toEqual(initializedState);
  });

  it('should return failureState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_FIXTURES_FAILURE,
    })).toEqual(failureState);
  });
});
