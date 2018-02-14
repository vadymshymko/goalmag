export const getFixtures = state => (
  state.fixtures.allIds.map(id => (
    state.fixtures.byId[id]
  ))
);

export const getFixturesCompetitionsIds = state => (
  [
    ...new Set(getFixtures(state).map(fixture => (
      parseInt(fixture.competitionId, 10)
    ))),
  ]
);

export const getFixturesByCompetitionId = (state, competitionId = 0) => (
  getFixtures(state).filter(fixture => (
    parseInt(fixture.competitionId, 10) === parseInt(competitionId, 10)
  ))
);

export const getFixture = (state, id = 0) => (
  state.fixtures.byId[id]
);

export const getIsFixturesInitialized = state => (
  state.fixtures.isInitialized
);
