import { createSelector } from 'reselect';
import { parse } from 'query-string';

export const getRouterLocationSearch = (state, props) => props.location.search;

export const getParsedRouterLocationSearch = createSelector(
  getRouterLocationSearch,
  routerLocationSearch => parse(routerLocationSearch)
);

export const getRouterMatchParams = (state, props) => props.match.params;

export const getDate = createSelector(
  getParsedRouterLocationSearch,
  parsedRouterLocationSearch => {
    const parsedDate = new Date(parsedRouterLocationSearch.date);

    const date = !Number.isNaN(parsedDate.getTime()) ? parsedDate : new Date();
    const dateDay = date.getUTCDate();
    const dateMonth = date.getUTCMonth();
    const dateYear = date.getUTCFullYear();

    return `${dateDay > 9 ? '' : '0'}${dateDay}.${
      dateMonth > 9 ? '' : '0'
    }${dateMonth + 1}.${dateYear}`;
  }
);

export const getCompetitionId = createSelector(
  getRouterMatchParams,
  matchParams => matchParams.competitionId
);

export const getMatchId = createSelector(
  getRouterMatchParams,
  matchParams => matchParams.matchId
);

export const getTeamId = createSelector(
  getRouterMatchParams,
  matchParams => matchParams.teamId
);

export const getPlayerId = createSelector(
  getRouterMatchParams,
  matchParams => matchParams.playerId
);
