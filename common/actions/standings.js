import { normalize } from 'normalizr';
import { standings as types } from 'types';
import { getIsStandingsFetching } from 'selectors';
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
  if (!competitionId || !matchday) {
    return Promise.reject(new Error('invalid competitionId or matchday'));
  }

  const state = getState();

  const standingsId = `${competitionId}-${matchday}`;
  const isFetching = getIsStandingsFetching(state, standingsId);

  if (isFetching) {
    return Promise.resolve();
  }

  dispatch(fetchStandingsRequest({
    id: standingsId,
  }));

  return callApi(`competitions/${competitionId}/standings?matchday=${matchday}`, {
    headers: {
      'X-Response-Control': 'full',
    },
  }).then((json) => {
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
    }));
  }).catch((error) => {
    dispatch(fetchStandingsFailure({
      id: standingsId,
    }));

    throw error;
  });
};
