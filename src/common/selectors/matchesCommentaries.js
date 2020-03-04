import { createSelector } from 'reselect';

import { getMatchId } from './router';

const getMatchesCommentaries = state => state.matchesCommentaries;

export const getMatchCommentaries = createSelector(
  getMatchesCommentaries,
  getMatchId,
  (matchesCommentaries, matchId) => matchesCommentaries[matchId] || {}
);

export default getMatchCommentaries;
