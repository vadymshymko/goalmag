import { teams as types } from 'types';
import { callApi } from 'utils';
import { getTeamState } from 'selectors';

const getTeamRequest = teamId => ({
  type: types.GET_TEAM_REQUEST,
  payload: {
    teamId,
  },
});

const getTeamSuccess = payload => ({
  type: types.GET_TEAM_SUCCESS,
  payload,
});

const getTeamFailure = teamId => ({
  type: types.GET_TEAM_FAILURE,
  payload: {
    teamId,
  },
});

export const getTeam = teamId => (dispatch, getState) => {
  if (!teamId) {
    throw new Error('Invalid team id');
  }

  const currentState = getTeamState(teamId, getState());

  if (currentState && (currentState.isInitialized || currentState.isFetching)) {
    return Promise.resolve();
  }

  dispatch(getTeamRequest(teamId));

  return callApi(`teams/${teamId}`).then(json => (
    dispatch(getTeamSuccess({
      teamId,
      teamInfo: {
        ...json,
        crestUrl: json.crestUrl.replace('http://', 'https://'),
      },
    }))
  )).catch((error) => {
    dispatch(getTeamFailure(teamId));
    throw error;
  });
};

export default getTeam;
