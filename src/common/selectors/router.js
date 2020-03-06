import { createSelector } from 'reselect';
import { parse } from 'query-string';

export const getRouterLocationSearch = (state, props) => props.location.search;

export const getParsedRouterLocationSearch = createSelector(
  getRouterLocationSearch,
  routerLocationSearch => parse(routerLocationSearch)
);

export const getRouterLocationSearchDateValue = createSelector(
  getParsedRouterLocationSearch,
  parsedRouterLocationSearch => {
    const parsedDate = new Date(parsedRouterLocationSearch.date);

    const dateValue = !Number.isNaN(parsedDate.getTime())
      ? parsedDate
      : new Date();

    return dateValue;
  }
);

export const getRouterMatchParams = (state, props) => props.match.params;

export const getUTCDate = createSelector(
  getRouterLocationSearchDateValue,
  dateValue => {
    const dateDay = dateValue.getUTCDate();
    const dateMonth = dateValue.getUTCMonth();
    const dateYear = dateValue.getUTCFullYear();

    return `${dateDay > 9 ? '' : '0'}${dateDay}.${
      dateMonth > 9 ? '' : '0'
    }${dateMonth + 1}.${dateYear}`;
  }
);

export const getUserDate = createSelector(
  getRouterLocationSearchDateValue,
  dateValue => {
    const dateDay = dateValue.getDate();
    const dateMonth = dateValue.getMonth();
    const dateYear = dateValue.getFullYear();

    return `${dateYear}-${dateMonth > 9 ? '' : '0'}${dateMonth + 1}-${
      dateDay > 9 ? '' : '0'
    }${dateDay}`;
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
