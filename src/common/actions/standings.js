import { callApi } from 'utils';

import {
  FETCH_COMPETITION_STANDINGS_REQUEST,
  FETCH_COMPETITION_STANDINGS_SUCCESS,
  FETCH_COMPETITION_STANDINGS_FAILURE,
} from 'actionsTypes';

import { getCompetitionId, getCompetitionStandingsIsFetching } from 'selectors';

const normalizeStandingsTable = table => {
  const tableGroups = [
    ...new Set([...table.map(item => item.compGroup || item.stageId)]),
  ];

  return tableGroups.reduce((result, groupId) => {
    return {
      ...result,
      [groupId]: table.filter(
        item => item.compGroup === groupId || item.stageId === groupId
      ),
    };
  }, {});
};

const shouldFetchCompetitionStandings = (state, params) => {
  return !getCompetitionStandingsIsFetching(state, params);
};

export const fetchCompetitionStandings = params => async (
  dispatch,
  getState
) => {
  const currentState = getState();
  const competitionId = getCompetitionId(currentState, params);

  try {
    if (
      !competitionId ||
      !shouldFetchCompetitionStandings(currentState, params)
    ) {
      return true;
    }

    dispatch({
      type: FETCH_COMPETITION_STANDINGS_REQUEST,
      payload: { competitionId },
    });

    const response = await callApi(`standings/${competitionId}`);
    const table = normalizeStandingsTable(response);

    return dispatch({
      type: FETCH_COMPETITION_STANDINGS_SUCCESS,
      payload: {
        competitionId,
        table,
      },
    });
  } catch (error) {
    console.error('fetchCompetitionStandings error: ', error);

    return dispatch({
      type: FETCH_COMPETITION_STANDINGS_FAILURE,
      payload: { competitionId },
    });
  }
};

export default fetchCompetitionStandings;
