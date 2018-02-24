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
    byId: {},
    allIds: [],
    initializedEndpoints: [],
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
      status: 'in_play',
    },
    {
      id: 2,
      key: 'value 2',
      status: 'in_play',
    },
  ],
};

const items = {
  1: {
    id: 1,
    key: 'value 1',
    status: 'in_play',
  },
  2: {
    id: 2,
    key: 'value 2',
    status: 'in_play',
  },
};

const finishedItems = {
  1: {
    id: 1,
    key: 'value 1',
    status: 'finished',
  },
  2: {
    id: 2,
    key: 'value 2',
    status: 'finished',
  },
};

const ids = [1, 2];

describe('fixtures actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should be rejected if date not passed', () => {
    const store = mockStore(initialStore);
    const expectedActions = [];

    return store.dispatch(actions.fetchFixtures({
      date: '2018-02-28',
    })).catch((error) => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(error).toBe('invalid date');
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

    return store.dispatch(actions.fetchFixtures({
      date: '2018-02-28',
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if request path is initialized', () => {
    const store = mockStore({
      ...initialStore,
      fixtures: {
        ...initialStore.fixtures,
        initializedEndpoints: ['fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28'],
      },
    });
    const expectedActions = [];

    return store.dispatch(actions.fetchFixtures({
      date: '2018-02-28',
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_FIXTURES_FAILURE', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_FIXTURES_REQUEST },
      { type: types.FETCH_FIXTURES_FAILURE },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28').replyWithError({
      message: 'Some Error',
      code: 'AWFUL_ERROR',
      statusCode: '500',
    });

    return store.dispatch(actions.fetchFixtures({
      date: '2018-02-28',
    })).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_FIXTURES_SUCCESS with isEndpointInitialized key to be falsy when not all fixtures are finished', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_FIXTURES_REQUEST },
      {
        type: types.FETCH_FIXTURES_SUCCESS,
        payload: {
          items,
          ids,
          endpoint: 'fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28',
          isEndpointInitialized: false,
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28').reply(
      200,
      mockResponse,
    );

    return store.dispatch(actions.fetchFixtures({
      date: '2018-02-28',
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_FIXTURES_SUCCESS with isEndpointInitialized key to be falsy when not all competition fixtures are finished', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_FIXTURES_REQUEST },
      {
        type: types.FETCH_FIXTURES_SUCCESS,
        payload: {
          items,
          ids,
          endpoint: 'competitions/1/fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28',
          isEndpointInitialized: false,
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/competitions/1/fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28').reply(
      200,
      mockResponse,
    );

    return store.dispatch(actions.fetchFixtures({
      competitionId: 1,
      date: '2018-02-28',
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_FIXTURES_SUCCESS with isEndpointInitialized key to be truthy if all fixtures are finished', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_FIXTURES_REQUEST },
      {
        type: types.FETCH_FIXTURES_SUCCESS,
        payload: {
          items: finishedItems,
          ids,
          endpoint: 'fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28',
          isEndpointInitialized: true,
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?&timeFrameStart=2018-02-28&timeFrameEnd=2018-02-28').reply(
      200,
      {
        fixtures: [
          {
            id: 1,
            key: 'value 1',
            status: 'finished',
          },
          {
            id: 2,
            key: 'value 2',
            status: 'finished',
          },
        ],
      },
    );

    return store.dispatch(actions.fetchFixtures({
      date: '2018-02-28',
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
