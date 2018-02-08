import { competitions as types } from 'types';
import reducer from '../competitions';

const initialState = {
  items: [],
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

const fetchingState = {
  ...initialState,
  isFetching: true,
};

const items = [
  {
    id: 1,
    key: 'value',
  },
  {
    id: 2,
    key: 'value',
  },
];

const initializedState = {
  ...initialState,
  items,
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
        items,
      },
    })).toEqual(initializedState);
  });

  it('should return failureState', () => {
    expect(reducer(undefined, {
      type: types.FETCH_COMPETITIONS_FAILURE,
    })).toEqual(failureState);
  });
});
