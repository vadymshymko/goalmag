import { normalize } from 'normalizr';
import { standings as types } from 'types';
import {
  getIsStandingsFetching,
  getCompetitionCurrentMatchDay,
  getStandingsLastUpdated,
} from 'selectors';
import { callApi } from 'utils';
import { standings as schema } from 'schemas';

export const fetchStandingsRequest = payload => ({
  type: types.FETCH_STANDINGS_REQUEST,
  payload,
});

export const fetchStandingsSuccess = payload => ({
  type: types.FETCH_STANDINGS_SUCCESS,
  payload,
});

export const fetchStandingsFailure = payload => ({
  type: types.FETCH_STANDINGS_FAILURE,
  payload,
});

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

  dispatch(fetchStandingsRequest({
    id: standingsId,
  }));

  return callApi(requestPath).then((json) => {
    const {
      entities: {
        standings: entities = {},
      },
      result: ids = [],
    } = normalize(json.standings, schema);

    return dispatch(fetchStandingsSuccess({
      id: standingsId,
      entities,
      ids,
      lastUpdated: Date.now(),
    }));
  }).catch((error) => {
    dispatch(fetchStandingsFailure({
      id: standingsId,
      lastUpdated: Date.now(),
    }));

    throw error;
  });
};
