import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import config from 'config';

import { tables as types } from 'types';
import * as actions from '../tables';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  tables: {
    entities: {},
    ids: [],
  },
};

const mockResponse = {
  matchday: 1,
  standing: [
    {
      id: 1,
      team: 'team 1',
    },
    {
      id: 2,
      team: 'team 2',
    },
  ],
};

const entities = {
  '1-1': {
    id: 1,
    competitionId: 1,
    matchday: 1,
    isFetching: false,
    isRequestFailed: false,
    isInitialized: true,
  },
};

const ids = ['1-1', '2-1', '3-1'];

const initializedState = {
  tables: {
    ...initialState.tables,
    entities: {
      ...entities,
      '2-1': {
        isFetching: true,
        isRequestFailed: false,
        isInitialized: false,
      },
      '3-1': {
        isFetching: false,
        isRequestFailed: true,
        isInitialized: false,
      },
    },
    ids,
  },
};

describe('tables actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should not create any actions if table is currently fetching', () => {
    const store = mockStore(initializedState);
    const expectedActions = [];

    return store.dispatch(actions.fetchTable({
      competitionId: 2,
      matchday: 1,
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if table is initialized without errors', () => {
    const store = mockStore(initializedState);
    const expectedActions = [];

    return store.dispatch(actions.fetchTable({
      competitionId: 1,
      matchday: 1,
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_TABLE_REQUEST && FETCH_TABLE_SUCCESS if table is defined in store but it is previously requestFailed', () => {
    const store = mockStore(initializedState);
    const expectedActions = [
      {
        type: types.FETCH_TABLE_REQUEST,
        payload: {
          id: '3-1',
        },
      },
      {
        type: types.FETCH_TABLE_SUCCESS,
        payload: {
          id: '3-1',
          table: {
            competitionId: 3,
            ...mockResponse,
          },
        },
      },
    ];

    Date.now = jest.fn(() => 1000);

    nock(`https:${config.apiRoot}`).get('/competitions/3/leagueTable?matchday=1').reply(
      200,
      mockResponse,
    );

    return store.dispatch(actions.fetchTable({
      competitionId: 3,
      matchday: 1,
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_TABLE_REQUEST && FETCH_TABLE_SUCCESS if table is not defined in store', () => {
    const store = mockStore(initializedState);
    const expectedActions = [
      {
        type: types.FETCH_TABLE_REQUEST,
        payload: {
          id: '4-1',
        },
      },
      {
        type: types.FETCH_TABLE_SUCCESS,
        payload: {
          id: '4-1',
          table: {
            competitionId: 4,
            ...mockResponse,
          },
        },
      },
    ];

    Date.now = jest.fn(() => 1000);

    nock(`https:${config.apiRoot}`).get('/competitions/4/leagueTable?matchday=1').reply(
      200,
      mockResponse,
    );

    return store.dispatch(actions.fetchTable({
      competitionId: 4,
      matchday: 1,
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_TABLE_FAILURE', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: types.FETCH_TABLE_REQUEST,
        payload: {
          id: '5-1',
        },
      },
      {
        type: types.FETCH_TABLE_FAILURE,
        payload: {
          id: '5-1',
        },
      },
    ];

    Date.now = jest.fn(() => 1000);

    nock(`https:${config.apiRoot}`).get('/competitions/5/leagueTable?matchday=1').replyWithError({
      message: 'Some Error',
      code: 'AWFUL_ERROR',
      statusCode: '500',
    });

    return store.dispatch(actions.fetchTable({
      competitionId: 5,
      matchday: 1,
    })).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
