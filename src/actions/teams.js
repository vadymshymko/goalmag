import { teams as types } from 'types';
import { callApi } from 'utils';
import { getTeamState } from 'selectors';

const fetchTeamRequest = teamId => ({
  type: types.FETCH_TEAM_REQUEST,
  payload: {
    teamId,
  },
});

const fetchTeamSuccess = payload => ({
  type: types.FETCH_TEAM_SUCCESS,
  payload,
});

const fetchTeamFailure = teamId => ({
  type: types.FETCH_TEAM_FAILURE,
  payload: {
    teamId,
  },
});

export const fetchTeam = teamId => (dispatch, getState) => {
  if (!teamId) {
    throw new Error('Invalid team id');
  }

  const currentState = getTeamState(teamId, getState());

  if (currentState && (currentState.isInitialized || currentState.isFetching)) {
    return Promise.resolve();
  }

  dispatch(fetchTeamRequest(teamId));

  return callApi(`teams/${teamId}`).then(json => (
    dispatch(fetchTeamSuccess({
      teamId,
      teamInfo: {
        ...json,
        crestUrl: json.crestUrl
          ? json.crestUrl.replace('http://', 'https://')
          : '',
      },
    }))
  )).catch((error) => {
    dispatch(fetchTeamFailure(teamId));
    throw error;
  });
};

export default fetchTeam;
