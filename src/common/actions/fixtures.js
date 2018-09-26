import moment from 'moment';
import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import {
  getIsFixturesFetching,
  getIsFixturesAllItemsFinished,
  getFixturesLastUpdated,
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
  const state = getState();
  const currentDateTime = Date.now();
  const requestDate = moment(date || currentDateTime).format('YYYY-MM-DD');

  const id = `${competitionId || 'all'}-${requestDate}`;

  const lastUpdated = getFixturesLastUpdated(state, id);
  const isFetching = getIsFixturesFetching(state, id);
  const isAllItemsFinished = getIsFixturesAllItemsFinished(state, id);
  const isNotNeedRequest = (
    isFetching
    || isAllItemsFinished
    || currentDateTime - lastUpdated <= 60000
  );

  if (isNotNeedRequest) {
    return Promise.resolve();
  }

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
      lastUpdated: Date.now(),
    }));
  }).catch((error) => {
    dispatch(fetchFixturesFailure({
      id,
      lastUpdated: Date.now(),
    }));

    throw error;
  });
};

export default fetchFixtures;
