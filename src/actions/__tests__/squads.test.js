import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import config from 'config';

import { squads as types } from 'types';
import * as actions from '../squads';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  squads: {
    entities: {},
    ids: [],
  },
};

const mockResponse = [
  {
    id: 1,
    name: 'name 1',
  },
  {
    id: 2,
    name: 'name 2',
  },
];

const entities = {
  1: {
    id: 1,
    name: 'name 1',
    isFetching: false,
    isRequestFailed: false,
    isInitialized: true,
  },
  2: {
    id: 2,
    name: 'name 2',
    isFetching: false,
    isRequestFailed: false,
    isInitialized: true,
  },
};

const ids = [1, 2, 3];

const initializedState = {
  squads: {
    ...initialState.squads,
    entities: {
      ...entities,
      3: {
        isFetching: true,
        isRequestFailed: false,
        isInitialized: false,
      },
      4: {
        isFetching: false,
        isRequestFailed: true,
        isInitialized: false,
      },
    },
    ids,
  },
};

describe('squads actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should not create any actions if squad is currently fetching', () => {
    const store = mockStore(initializedState);
    const expectedActions = [];

    return store.dispatch(actions.fetchSquad(3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if squad is initialized without errors', () => {
    const store = mockStore(initializedState);
    const expectedActions = [];

    return store.dispatch(actions.fetchSquad(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_SQUAD_REQUEST && FETCH_SQUAD_SUCCESS if squad is defined in store but it is previously requestFailed', () => {
    const store = mockStore(initializedState);
    const expectedActions = [
      {
        type: types.FETCH_SQUAD_REQUEST,
        payload: {
          id: 4,
        },
      },
      {
        type: types.FETCH_SQUAD_SUCCESS,
        payload: {
          id: 4,
          players: mockResponse,
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/teams/4/players').reply(
      200,
      {
        players: mockResponse,
      },
    );

    return store.dispatch(actions.fetchSquad(4)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_SQUAD_REQUEST && FETCH_SQUAD_SUCCESS if squad is not defined in store', () => {
    const store = mockStore(initializedState);
    const expectedActions = [
      {
        type: types.FETCH_SQUAD_REQUEST,
        payload: {
          id: 5,
        },
      },
      {
        type: types.FETCH_SQUAD_SUCCESS,
        payload: {
          id: 5,
          players: mockResponse,
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/teams/5/players').reply(
      200,
      {
        players: mockResponse,
      },
    );

    return store.dispatch(actions.fetchSquad(5)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_SQUAD_FAILURE', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: types.FETCH_SQUAD_REQUEST,
        payload: {
          id: 1,
        },
      },
      {
        type: types.FETCH_SQUAD_FAILURE,
        payload: {
          id: 1,
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/teams/1/players').replyWithError({
      message: 'Some Error',
      code: 'AWFUL_ERROR',
      statusCode: '500',
    });

    return store.dispatch(actions.fetchSquad(1)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
