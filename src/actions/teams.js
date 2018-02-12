import { teams as types } from 'types';
import { callApi } from 'utils';
import { getTeamState } from 'selectors';

const fetchTeamRequest = id => ({
  type: types.FETCH_TEAM_REQUEST,
  payload: {
    id,
  },
});

const fetchTeamSuccess = payload => ({
  type: types.FETCH_TEAM_SUCCESS,
  payload,
});

const fetchTeamFailure = id => ({
  type: types.FETCH_TEAM_FAILURE,
  payload: {
    id,
  },
});

export const fetchTeam = teamId => (dispatch, getState) => {
  if (!teamId) {
    throw new Error('Invalid team id');
  }

  const currentState = getTeamState(getState(), teamId);

  if (currentState && (currentState.isInitialized || currentState.isFetching)) {
    return Promise.resolve();
  }

  dispatch(fetchTeamRequest(teamId));

  return callApi(`teams/${teamId}`).then(json => (
    dispatch(fetchTeamSuccess({
      id: teamId,
      info: {
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
