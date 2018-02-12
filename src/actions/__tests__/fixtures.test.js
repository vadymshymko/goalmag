import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import config from 'config';
import { fixtures as types } from 'types';
import * as actions from '../fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialStore = {
  fixtures: {
    ids: [],
    items: {},
    isFetching: false,
    isRequestFailed: false,
    isInitialized: false,
  },
};

const mockResponse = {
  fixtures: [
    {
      id: 1,
      key: 'value 1',
    },
    {
      id: 2,
      key: 'value 2',
    },
  ],
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

describe('fixtures actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create FETCH_FIXTURES_SUCCESS', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_FIXTURES_REQUEST },
      {
        type: types.FETCH_FIXTURES_SUCCESS,
        payload: {
          items: {},
          ids: [],
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?timeFrame=n1').reply(
      200,
      {
        fixtures: [],
      },
    );

    return store.dispatch(actions.fetchFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_FIXTURES_SUCCESS', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_FIXTURES_REQUEST },
      {
        type: types.FETCH_FIXTURES_SUCCESS,
        payload: {
          items,
          ids,
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?timeFrame=n1').reply(
      200,
      mockResponse,
    );

    return store.dispatch(actions.fetchFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_FIXTURES_FAILURE', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_FIXTURES_REQUEST },
      { type: types.FETCH_FIXTURES_FAILURE },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?timeFrame=n1').replyWithError({
      message: 'Some Error',
      code: 'AWFUL_ERROR',
      statusCode: '500',
    });

    return store.dispatch(actions.fetchFixtures()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if fixtures isInitialized', () => {
    const store = mockStore({
      ...initialStore,
      fixtures: {
        ...initialStore.fixtures,
        isInitialized: true,
      },
    });
    const expectedActions = [];

    return store.dispatch(actions.fetchFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if fixtures isFetching', () => {
    const store = mockStore({
      ...initialStore,
      fixtures: {
        ...initialStore.fixtures,
        isFetching: true,
      },
    });
    const expectedActions = [];

    return store.dispatch(actions.fetchFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
