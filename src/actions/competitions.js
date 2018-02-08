import { normalize } from 'normalizr';
import { competitions as types } from 'types';
import { competitions as schema } from 'schemas';
import { getCompetition } from 'selectors';
import { callApi } from 'utils';

export const fetchCompetitionsRequest = () => ({
  type: types.FETCH_COMPETITIONS_REQUEST,
});

export const fetchCompetitionsSuccess = payload => ({
  type: types.FETCH_COMPETITIONS_SUCCESS,
  payload,
});

export const fetchCompetitionsFailure = () => ({
  type: types.FETCH_COMPETITIONS_FAILURE,
});

export const fetchCompetitionTableRequest = payload => ({
  type: types.FETCH_COMPETITION_TABLE_REQUEST,
  payload,
});

export const fetchCompetitionTableSuccess = payload => ({
  type: types.FETCH_COMPETITION_TABLE_SUCCESS,
  payload,
});

export const fetchCompetitionTableFailure = payload => ({
  type: types.FETCH_COMPETITION_TABLE_FAILURE,
  payload,
});

export const fetchCompetitions = () => (dispatch, getState) => {
  const currentState = getState().competitions;

  if (currentState.isInitialized || currentState.isFetching) {
    return Promise.resolve();
  }

  dispatch(fetchCompetitionsRequest());

  return callApi('competitions').then((json) => {
    const {
      entities: {
        competitions: items = {},
      },
      result: ids = [],
    } = normalize(json, schema);

    dispatch(fetchCompetitionsSuccess({
      items,
      ids,
    }));
  }).catch((error) => {
    dispatch(fetchCompetitionsFailure());
    throw error;
  });
};

export const fetchCompetitionTable = ({
  matchday,
  competitionId,
} = {}) => (dispatch, getState) => {
  const competition = getCompetition(getState(), competitionId);

  if (!competition) {
    throw new Error('invalid competition id');
  }

  const requestMatchday = matchday || competition.currentMatchday;

  if (
    competition.tables
    && competition.tables[requestMatchday]
    && competition.tables[requestMatchday].isInitialized
    && !competition.tables[requestMatchday].isRequestFailed
  ) {
    return Promise.resolve();
  }

  dispatch(fetchCompetitionTableRequest({
    competitionId,
    matchday: requestMatchday,
  }));

  return callApi(`competitions/${competitionId}/leagueTable?matchday=${requestMatchday}`).then(({ standings }) => (
    dispatch({
      standings,
      competitionId,
      matchday: requestMatchday,
    })
  )).catch((error) => {
    dispatch(fetchCompetitionTableFailure({
      competitionId,
      matchday: requestMatchday,
    }));
    throw error;
  });
};
