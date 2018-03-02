import { createSelector } from 'reselect';

export const getCompetitions = state => (
  state.competitions.ids.map(id => (
    state.competitions.entities[id]
  ))
);

export const getCompetitionsByLeagueCodes = createSelector(
  getCompetitions,
  (state, leagueCodes) => leagueCodes,
  (competitions, leagueCodes) => (
    competitions.filter(item => (
      !!leagueCodes.find(leagueCode => (
        item.league.toLowerCase() === leagueCode.toLowerCase()
      ))
    ))
  ),
);

export const getCompetitionsLinks = createSelector(
  getCompetitionsByLeagueCodes,
  copetitions => (
    copetitions.map(competition => ({
      to: `/competition/${competition.id}`,
      title: competition.caption,
    }))
  ),
);

export const getCompetition = (state, id = 0) => (
  state.competitions.entities[id]
);

export const getIsCompetitionsFetching = state => (
  state.competitions.isFetching
);

export const getIsCompetitionsInitialized = state => (
  state.competitions.isInitialized
);
