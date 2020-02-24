import { createSelector } from 'reselect';
import { parse } from 'query-string';

const getMatches = state => state.matches;

export const getMatchesDateFilter = (state, props) => {
  const parsedDate = parse(props.location.search).date || Date.now();

  const date = !Number.isNaN(new Date(parsedDate))
    ? new Date(parsedDate)
    : new Date();
  const dateDay = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  return `${dateDay > 9 ? '' : '0'}${dateDay}.${
    dateMonth > 9 ? '' : '0'
  }${dateMonth + 1}.${dateYear}`;
};

export const getMatchesByDate = createSelector(
  getMatches,
  getMatchesDateFilter,
  (matches, date) => matches[date] || {}
);

export const getMatchesIsFetching = createSelector(
  getMatchesByDate,
  matches => matches.isFetching
);

export const getMatchesIsInitialized = createSelector(
  getMatchesByDate,
  matches => matches.isInitialized
);

export const getMatchesEntities = createSelector(
  getMatchesByDate,
  matches => matches.entities
);

export const getMatchesIds = createSelector(
  getMatchesByDate,
  matches => matches.ids
);

export const getMatchesLastUpdated = createSelector(
  getMatchesByDate,
  matches => matches.lastUpdated
);

export const getMatchesItems = createSelector(
  getMatchesIds,
  getMatchesEntities,
  (ids, entities) => ids.map(id => entities[id])
);
