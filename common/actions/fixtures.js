import moment from 'moment';
import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import {
  getIsFixturesFetching,
  getIsFixturesAllItemsFinished,
} from 'selectors';
import { callApi } from 'utils';

export const fetchFixturesRequest = payload => ({
  type: types.FETCH_FIXTURES_REQUEST,
  payload,
});

export const fetchFixturesSuccess = payload => ({
  type: types.FETCH_FIXTURES_SUCCESS,
  payload,
});

export const fetchFixturesFailure = payload => ({
  type: types.FETCH_FIXTURES_FAILURE,
  payload,
});

export const fetchFixtures = ({
  competitionId,
  date,
} = {}) => (dispatch, getState) => {
  if (!date) {
    return Promise.reject(new Error('invalid date or competitionId'));
  }

  const state = getState();

  const id = `${competitionId || 'all'}-${date}`;

  const isFetching = getIsFixturesFetching(state, id);
  const isAllItemsFinished = getIsFixturesAllItemsFinished(state, id);

  if (isFetching || isAllItemsFinished) {
    return Promise.resolve();
  }

  const requestDate = moment(date).format('YYYY-MM-DD');
  const requestDateFilter = `dateFrom=${requestDate}&dateTo=${requestDate}`;
  const requestCompetitionFilter = competitionId
    ? `competitions=${competitionId}`
    : '';
  const requestPath = `matches?${requestCompetitionFilter}&${requestDateFilter}`;

  dispatch(fetchFixturesRequest({
    id,
  }));

  return callApi(requestPath).then((json) => {
    const {
      entities: {
        fixtures: entities = {},
      },
      result: ids = [],
    } = normalize(json.matches, schema);

    return dispatch(fetchFixturesSuccess({
      entities,
      ids,
      id,
      isAllItemsFinished: !json.matches.find(item => item.status.toLowerCase() !== 'finished'),
    }));
  }).catch((error) => {
    dispatch(fetchFixturesFailure({
      requestPath,
    }));

    throw error;
  });
};

export default fetchFixtures;
