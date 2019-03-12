import { standings as types } from 'types';
import {
  getIsStandingsFetching,
  getCompetitionCurrentMatchDay,
  getStandingsLastUpdated,
} from 'selectors';
import { callApi } from 'utils';

export const fetchStandings = ({
  competitionId,
  matchday,
} = {}) => (dispatch, getState) => {
  if (!competitionId) {
    return Promise.reject(new Error('invalid competitionId'));
  }

  const state = getState();

  const currentMatchday = getCompetitionCurrentMatchDay(state, competitionId);
  const requestMatchday = matchday || currentMatchday;
  const standingsId = `${competitionId}-${requestMatchday}`;
  const isFetching = getIsStandingsFetching(state, standingsId);
  const lastUpdated = getStandingsLastUpdated(state, standingsId);
  const currentDateTime = Date.now();
  const isNotNeedRequest = (
    isFetching
    || currentDateTime - lastUpdated <= 60000
  );

  if (isNotNeedRequest) {
    return Promise.resolve();
  }

  const requestPath = `competitions/${competitionId}/standings?matchday=${requestMatchday}`;

  dispatch({
    type: types.FETCH_STANDINGS_REQUEST,
    payload: {
      id: standingsId,
    },
  });

  return callApi(requestPath).then(json => dispatch({
    type: types.FETCH_STANDINGS_SUCCESS,
    payload: {
      id: standingsId,
      items: json.standings,
      lastUpdated: Date.now(),
    },
  })).catch(() => dispatch({
    type: types.FETCH_STANDINGS_FAILURE,
    payload: {
      id: standingsId,
      lastUpdated: Date.now(),
    },
  }));
};

export default fetchStandings;
