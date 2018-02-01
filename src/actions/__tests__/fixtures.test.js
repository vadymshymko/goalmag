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
    items: [],
    isFetching: false,
    isRequestFailed: false,
    isInitialized: false,
  },
};

describe('fixtures actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create GET_FIXTURES_SUCCESS', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.GET_FIXTURES_REQUEST },
      {
        type: types.GET_FIXTURES_SUCCESS,
        payload: {
          items: [],
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?timeFrame=n1').reply(
      200,
      {
        fixtures: [],
      },
    );

    return store.dispatch(actions.getFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create GET_FIXTURES_FAILURE', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.GET_FIXTURES_REQUEST },
      { type: types.GET_FIXTURES_FAILURE },
    ];

    nock(`https:${config.apiRoot}`).get('/fixtures?timeFrame=n1').replyWithError({
      message: 'Some Error',
      code: 'AWFUL_ERROR',
      statusCode: '500',
    });

    return store.dispatch(actions.getFixtures()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if fixtures isInitialized', () => {
    const store = mockStore({
      ...initialStore,
      isInitialized: true,
    });
    const expectedActions = [];

    return store.dispatch(actions.getFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if fixtures isFetching', () => {
    const store = mockStore({
      ...initialStore,
      isFetching: true,
    });
    const expectedActions = [];

    return store.dispatch(actions.getFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
