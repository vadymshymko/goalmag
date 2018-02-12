import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import { callApi } from 'utils';

const fetchFixturesRequest = () => ({
  type: types.FETCH_FIXTURES_REQUEST,
});

const fetchFixturesSuccess = payload => ({
  type: types.FETCH_FIXTURES_SUCCESS,
  payload,
});

const fetchFixturesFailure = () => ({
  type: types.FETCH_FIXTURES_FAILURE,
});

export const fetchFixtures = () => (dispatch, getState) => {
  const currentState = getState().fixtures;

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(fetchFixturesRequest());

  return callApi('fixtures?timeFrame=n1').then((json) => {
    const {
      entities: {
        fixtures: items = {},
      },
      result: ids = [],
    } = normalize(json.fixtures, schema);

    return dispatch(fetchFixturesSuccess({
      items,
      ids,
    }));
  }).catch((error) => {
    dispatch(fetchFixturesFailure());
    throw error;
  });
};

export default fetchFixtures;
