import moment from 'moment';
import { normalize } from 'normalizr';
import { fixtures as schema } from 'schemas';
import { fixtures as types } from 'types';
import {
  getFixturesFilterIsFetching,
  getFixturesFilterIsAllFinished,
  getFixturesFilterLastUpdated,
} from 'selectors';
import { callApi } from 'utils';

// const requestDate = (!competitionId && !matchday) && date
//   ? moment(date || currentDateTime).format('YYYY-MM-DD')
//   : '';
// const requestMatchday = competitionId && matchday
//   ? matchday
//   : '';

// if (!requestDate && !requestMatchday) {
//   return Promise.reject(new Error('invalid competitionId|date|matchday'));
// }

// const filterId = competitionId && matchday
//   ? `${competitionId || 'all'}-${matchday}`
//   : `all-${requestDate}`;

// const requestFilter = requestMatchday
//   ? `competitions/${competitionId}/matches?matchday${requestMatchday}`
//   : `matches?dateFrom=${requestDate}&dateTo=${requestDate}`;

export const fetchFixtures = ({
  competitionId,
  date,
  // matchday,
} = {}) => (dispatch, getState) => {
  const state = getState();

  const currentDateTime = Date.now();
  const requestDate = moment(date || currentDateTime).format('YYYY-MM-DD');

  const filterId = `${competitionId || 'all'}-${requestDate}`;

  const lastUpdated = getFixturesFilterLastUpdated(state, filterId);
  const isFetching = getFixturesFilterIsFetching(state, filterId);
  const isAllItemsFinished = getFixturesFilterIsAllFinished(state, filterId);

  if (
    isFetching
    || isAllItemsFinished
    || currentDateTime - lastUpdated <= 55000
  ) {
    return Promise.resolve();
  }

  dispatch({
    type: types.FETCH_FIXTURES_REQUEST,
    payload: {
      filterId,
    },
  });

  const requestFilter = competitionId
    ? `competitions/${competitionId}/matches?dateFrom=${requestDate}&dateTo=${requestDate}`
    : `matches?dateFrom=${requestDate}&dateTo=${requestDate}`;

  return callApi(requestFilter).then((json) => {
    const formattedResponse = competitionId
      ? json.matches.map(item => ({
        ...item,
        competition: {
          id: competitionId,
        },
      }))
      : json.matches;

    const {
      entities: {
        fixtures: entities = {},
      },
      result: ids = [],
    } = normalize(formattedResponse, schema);

    return dispatch({
      type: types.FETCH_FIXTURES_SUCCESS,
      payload: {
        entities,
        ids,
        filterId,
        isAllFinished: !formattedResponse.find(item => item.status.toLowerCase() !== 'finished'),
        lastUpdated: Date.now(),
      },
    });
  }).catch(() => dispatch({
    type: types.FETCH_FIXTURES_FAILURE,
    payload: {
      filterId,
      lastUpdated: Date.now(),
    },
  }));
};

export default fetchFixtures;
