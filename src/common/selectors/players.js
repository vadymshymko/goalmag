import { createSelector } from 'reselect';

import { getPlayerId } from './router';

const getPlayers = state => state.players;

export const getPlayer = createSelector(
  getPlayers,
  getPlayerId,
  (players, playerId) => players[playerId] || {}
);

export const getPlayerIsFetching = createSelector(
  getPlayer,
  player => player.isFetching
);

export const getPlayerIsInitialized = createSelector(
  getPlayer,
  player => player.isInitialized
);

export const getPlayerInfo = createSelector(
  getPlayer,
  player => player.info || {}
);
