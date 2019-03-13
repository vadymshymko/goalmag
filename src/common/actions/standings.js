import { standings as types } from 'types';
import {
  getIsStandingsFetching,
  getStandingsLastUpdated,
} from 'selectors';
import { callApi } from 'utils';

export const fetchStandings = ({
  competitionId,
} = {}) => (dispatch, getState) => {
  if (!competitionId) {
    return Promise.reject(new Error('invalid competitionId'));
  }

  const state = getState();

  const isFetching = getIsStandingsFetching(state, competitionId);
  const lastUpdated = getStandingsLastUpdated(state, competitionId);
  const currentDateTime = Date.now();
  const isNotNeedRequest = (
    isFetching
    || currentDateTime - lastUpdated <= 60000
  );

  if (isNotNeedRequest) {
    return Promise.resolve();
  }

  const requestPath = `competitions/${competitionId}/standings`;

  dispatch({
    type: types.FETCH_STANDINGS_REQUEST,
    payload: {
      id: competitionId,
    },
  });

  return callApi(requestPath).then(json => dispatch({
    type: types.FETCH_STANDINGS_SUCCESS,
    payload: {
      id: competitionId,
      items: json.standings,
      lastUpdated: Date.now(),
    },
  })).catch(() => dispatch({
    type: types.FETCH_STANDINGS_FAILURE,
    payload: {
      id: competitionId,
      lastUpdated: Date.now(),
    },
  }));
};

export default fetchStandings;
