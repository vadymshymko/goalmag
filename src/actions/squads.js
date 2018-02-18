import { squads as types } from 'types';
import { callApi } from 'utils';
import { getSquad } from 'selectors';

export const fetchSquadRequest = id => ({
  type: types.FETCH_SQUAD_REQUEST,
  payload: {
    id,
  },
});

export const fetchSquadSuccess = payload => ({
  type: types.FETCH_SQUAD_SUCCESS,
  payload,
});

export const fetchSquadFailure = id => ({
  type: types.FETCH_SQUAD_FAILURE,
  payload: {
    id,
  },
});

export const fetchSquad = teamId => (dispatch, getState) => {
  if (!teamId) {
    throw new Error('Invalid team id');
  }

  const currentState = getSquad(getState(), teamId);

  if (currentState && (currentState.isInitialized || currentState.isFetching)) {
    return Promise.resolve();
  }

  dispatch(fetchSquadRequest(teamId));

  return callApi(`teams/${teamId}/players`).then(json => (
    dispatch(fetchSquadSuccess({
      id: teamId,
      players: json.players,
    }))
  )).catch((error) => {
    dispatch(fetchSquadFailure(teamId));
    throw error;
  });
};

export default fetchSquad;
