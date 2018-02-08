import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import config from 'config';
import { competitions as types } from 'types';
import * as actions from '../competitions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialStore = {
  competitions: {
    items: [],
    isFetching: false,
    isRequestFailed: false,
    isInitialized: false,
  },
};

describe('competitions actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create FETCH_COMPETITIONS_SUCCESS', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_COMPETITIONS_REQUEST },
      {
        type: types.FETCH_COMPETITIONS_SUCCESS,
        payload: {
          items: [],
        },
      },
    ];

    nock(`https:${config.apiRoot}`).get('/competitions').reply(
      200,
      [],
    );

    return store.dispatch(actions.fetchCompetitions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FETCH_COMPETITIONS_FAILURE', () => {
    const store = mockStore(initialStore);
    const expectedActions = [
      { type: types.FETCH_COMPETITIONS_REQUEST },
      { type: types.FETCH_COMPETITIONS_FAILURE },
    ];

    nock(`https:${config.apiRoot}`).get('/competitions').replyWithError({
      message: 'Some Error',
      code: 'AWFUL_ERROR',
      statusCode: '500',
    });

    return store.dispatch(actions.fetchCompetitions()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if competitions isInitialized', () => {
    const store = mockStore({
      ...initialStore,
      competitions: {
        ...initialStore.competitions,
        isInitialized: true,
      },
    });
    const expectedActions = [];

    return store.dispatch(actions.fetchCompetitions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not create any actions if competitions isFetching', () => {
    const store = mockStore({
      ...initialStore,
      competitions: {
        ...initialStore.competitions,
        isFetching: true,
      },
    });
    const expectedActions = [];

    return store.dispatch(actions.fetchCompetitions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
