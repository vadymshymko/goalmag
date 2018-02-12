import { getURLLastPath } from 'utils';

export const getCompetitionFixtures = (state, competitionId = 0) => (
  state.fixtures.items.filter(fixture => (
    parseInt(getURLLastPath(fixture.links.competition.href), 10) === parseInt(competitionId, 10)
  ))
);

export const getFixturesCompetitions = state => (
  [
    ...new Set(state.fixtures.items.map(fixture => (
      parseInt(getURLLastPath(fixture.links.competition.href), 10)
    ))),
  ].map(competitionId => ({
    ...state.competitions.items[competitionId],
  }))
);
