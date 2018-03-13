import { tables as types } from 'types';
import { getTable } from 'selectors';
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
  competitionId,
  matchday,
} = {}) => (dispatch, getState) => {
  if (!competitionId || !matchday) {
    return Promise.reject(new Error('invalid competitionId or matchday'));
  }

  const state = getState();

  const tableId = `${competitionId}-${matchday}`;
  const table = getTable(state, tableId);

  if (table && (!table.isRequestFailed || table.isFetching)) {
    return Promise.resolve();
  }

  dispatch(fetchTableRequest({
    id: tableId,
  }));

  return callApi(`competitions/${competitionId}/leagueTable?matchday=${matchday}`, {
    headers: {
      'X-Response-Control': 'full',
    },
  }).then(json => (
    dispatch(fetchTableSuccess({
      id: tableId,
      table: {
        competitionId,
        ...json,
      },
    }))
  )).catch((error) => {
    dispatch(fetchTableFailure({
      id: tableId,
    }));

    throw error;
  });
};
