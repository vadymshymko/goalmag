import { createSelector } from 'reselect';

import { getPlayerId } from './router';

const getPlayers = state => state.players;

export const getPlayer = createSelector(
  getPlayers,
  getPlayerId,
  (players, playerId) => players[playerId] || {}
);

export default getPlayer;
