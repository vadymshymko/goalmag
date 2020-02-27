import { normalize } from 'normalizr';

import { callApi } from 'utils';

import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
} from 'actionsTypes';

import { teamSchema } from 'schemas';

import { getTeamIsFetching, getTeamIsInitialized, getTeamId } from 'selectors';

const shouldFetchTeam = (state, params) => {
  return (
    !getTeamIsFetching(state, params) && !getTeamIsInitialized(state, params)
  );
};

export const fetchTeam = params => async (dispatch, getState) => {
  const currentState = getState();
  const teamId = getTeamId(currentState, params);

  console.log({
    params,
    teamId,
    shouldFetchTeam: shouldFetchTeam(currentState, params),
  });

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
        info: normalizedResponse.entities.teams[teamId],
      },
    });
  } catch (error) {
    console.log('fetchTeam error', error);

    return dispatch({
      type: FETCH_TEAM_FAILURE,
      payload: {
        id: teamId,
      },
    });
  }
};

export default fetchTeam;
