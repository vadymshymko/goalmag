import { teams as types } from 'types';
import { callApi } from 'utils';
import { getTeam } from 'selectors';

export const fetchTeam = id => (dispatch, getState) => {
  if (!id) {
    return Promise.reject(new Error('Invalid team id'));
  }

  const state = getState();
  const team = getTeam(state, id);

  if (team.isFetching || team.isInitialized) {
    return Promise.resolve();
  }

  dispatch({
    type: types.FETCH_TEAM_REQUEST,
    payload: {
      id,
    },
  });

  return callApi(`teams/${id}`).then(json => (
    dispatch({
      type: types.FETCH_TEAM_SUCCESS,
      payload: {
        ...json,
        crestUrl: (json.crestUrl || '').replace('http://', 'https://'),
      },
    })
  )).catch(() => dispatch({
    type: types.FETCH_TEAM_FAILURE,
    payload: {
      id,
    },
  }));
};

export default fetchTeam;
