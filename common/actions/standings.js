import { normalize } from 'normalizr';
import { standings as types } from 'types';
import { getStandings } from 'selectors';
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
} = {}) => (dispatch, getState) =>
  // if (!competitionId || !matchday) {
  //   return Promise.reject(new Error('invalid competitionId or matchday'));
  // }
  //
  // const state = getState();
  //
  // const tableId = `${competitionId}-${matchday}`;
  // const table = getStandings(state, tableId);
  //
  // if (table && (!table.isRequestFailed || table.isFetching)) {
  //   return Promise.resolve();
  // }
  //
  // dispatch(fetchStandingsRequest({
  //   id: tableId,
  // }));

  callApi(`competitions/${competitionId}/standings?matchday=${matchday}`, {
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
    console.log({
      entities,
      ids,
    });
    // dispatch(fetchStandingsSuccess({
    //   id: tableId,
    //   table: {
    //     competitionId,
    //     standing: json.standings[0].table,
    //   },
    // }))
  }).catch((error) => {
    // dispatch(fetchStandingsFailure({
    //   id: tableId,
    // }));
    //
    // throw error;
  });
