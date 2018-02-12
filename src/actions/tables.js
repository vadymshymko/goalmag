import { tables as types } from 'types';
import { getCompetition, getTable } from 'selectors';
import { callApi } from 'utils';

export const fetchTableRequest = payload => ({
  type: types.FETCH_TABLE_REQUEST,
  payload,
});

export const fetchTableSuccess = payload => ({
  type: types.FETCH_TABLE_SUCCESS,
  payload,
});

export const fetchTableFailure = payload => ({
  type: types.FETCH_TABLE_FAILURE,
  payload,
});

export const fetchTable = ({
  matchday,
  competitionId,
} = {}) => (dispatch, getState) => {
  const state = getState();
  const tableCompetition = getCompetition(state, competitionId);

  if (!tableCompetition) {
    throw new Error('invalid competition id');
  }

  const requestCompetitionId = tableCompetition.id;
  const requestMatchday = matchday || tableCompetition.currentMatchday;

  const tableId = `${requestCompetitionId}-${requestMatchday}`;
  const table = getTable(state, tableId);

  if ((table && !table.isRequestFailed) || (table && table.isFetching)) {
    return Promise.resolve();
  }

  dispatch(fetchTableRequest({
    id: tableId,
  }));

  return callApi(`competitions/${competitionId}/leagueTable?matchday=${requestMatchday}`, {
    headers: {
      'X-Response-Control': 'full',
    },
  }).then(json => (
    dispatch(fetchTableSuccess({
      id: tableId,
      table: json,
    }))
  )).catch((error) => {
    dispatch(fetchTableFailure({
      id: tableId,
    }));

    throw error;
  });
};
