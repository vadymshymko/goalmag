import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import config from 'config';

import { competitions as types } from 'types';
import * as actions from '../competitions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  competitions: {
    entities: {},
    ids: [],
    isFetching: false,
    isRequestFailed: false,
    lastUpdated: 0,
  },
};

const mockResponse = {
  competitions: [
    {
      id: 1,
      caption: '1 caption',
    },
    {
      id: 2,
      caption: '2 caption',
    },
  ],
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

describe('competitions actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create FETCH_COMPETITIONS_SUCCESS (empty response)', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.FETCH_COMPETITIONS_REQUEST },
      {
        type: types.FETCH_COMPETITIONS_SUCCESS,
        payload: {
          entities: {},
          ids: [],
          lastUpdated: 1000,
        },
      },
    ];

    Date.now = jest.fn(() => 1000);

    nock(`https:${config.apiRoot}`).get('/competitions?plan=TIER_ONE').reply(
      200,
      [],
    );

    return store.dispatch(actions.fetchCompetitions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_COMPETITIONS_SUCCESS', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.FETCH_COMPETITIONS_REQUEST },
      {
        type: types.FETCH_COMPETITIONS_SUCCESS,
        payload: {
          entities,
          ids,
          lastUpdated: 1000,
        },
      },
    ];

    Date.now = jest.fn(() => 1000);

    nock(`https:${config.apiRoot}`).get('/competitions?plan=TIER_ONE').reply(
      200,
      mockResponse,
    );

    return store.dispatch(actions.fetchCompetitions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_COMPETITIONS_FAILURE', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.FETCH_COMPETITIONS_REQUEST },
      {
        type: types.FETCH_COMPETITIONS_FAILURE,
        payload: {
          lastUpdated: 1000,
        },
      },
    ];

    Date.now = jest.fn(() => 1000);

    nock(`https:${config.apiRoot}`).get('/competitions?plan=TIER_ONE').replyWithError({
      message: 'Some Error',
      code: 'AWFUL_ERROR',
      statusCode: '500',
    });

    return store.dispatch(actions.fetchCompetitions()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if competitions lastUpdated param > 0', () => {
    const store = mockStore({
      ...initialState,
      competitions: {
        ...initialState.competitions,
        lastUpdated: 1000,
      },
    });
    const expectedActions = [];

    return store.dispatch(actions.fetchCompetitions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if competitions isFetching', () => {
    const store = mockStore({
      ...initialState,
      competitions: {
        ...initialState.competitions,
        isFetching: true,
      },
    });
    const expectedActions = [];

    return store.dispatch(actions.fetchCompetitions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
