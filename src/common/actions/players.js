import { normalize } from 'normalizr';

import { callApi } from 'utils';

import {
  FETCH_PLAYER_REQUEST,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYER_FAILURE,
} from 'actionsTypes';

import { playerSchema } from 'schemas';

import { getPlayer, getPlayerId } from 'selectors';

const shouldFetchPlayer = (state, params) => {
  const playerState = getPlayer(state, params);

  return !playerState.isFetching && !playerState.isInitialized;
};

export const fetchPlayer = params => async (dispatch, getState) => {
  const currentState = getState();
  const playerId = getPlayerId(currentState, params);

  try {
    if (!playerId || !shouldFetchPlayer(currentState, params)) {
      return true;
    }

    dispatch({
      type: FETCH_PLAYER_REQUEST,
      payload: {
        id: playerId,
      },
    });

    const response = await callApi(`players/${playerId}`);
    const normalizedResponse = normalize(response[0], playerSchema);

    return dispatch({
      type: FETCH_PLAYER_SUCCESS,
      payload: {
        id: playerId,
        ...normalizedResponse.entities.players[playerId],
      },
    });
  } catch (error) {
    console.log('fetchPlayer error', error);

    return dispatch({
      type: FETCH_PLAYER_FAILURE,
      payload: {
        id: playerId,
      },
    });
  }
};

export default fetchPlayer;
