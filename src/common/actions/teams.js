import { normalize } from 'normalizr';

import { callApi } from 'utils';

import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
} from 'actionsTypes';

import { teamSchema } from 'schemas';

import { getTeam, getTeamId } from 'selectors';

const shouldFetchTeam = (state, params) => {
  const teamState = getTeam(state, params);

  return !teamState.isFetching && !teamState.isInitialized;
};

export const fetchTeam = params => async (dispatch, getState) => {
  const currentState = getState();
  const teamId = getTeamId(currentState, params);

  try {
    if (!teamId || !shouldFetchTeam(currentState, params)) {
      return true;
    }

    dispatch({
      type: FETCH_TEAM_REQUEST,
      payload: {
        id: teamId,
      },
    });

    const response = await callApi(`teams/${teamId}`);
    const normalizedResponse = normalize(response[0], teamSchema);

    return dispatch({
      type: FETCH_TEAM_SUCCESS,
      payload: {
        id: teamId,
        ...normalizedResponse.entities.teams[teamId],
      },
    });
  } catch (error) {
    console.error('fetchTeam error');

    return dispatch({
      type: FETCH_TEAM_FAILURE,
      payload: {
        id: teamId,
        errorCode: error.response.status,
      },
    });
  }
};

export default fetchTeam;
