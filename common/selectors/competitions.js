import { createSelector } from 'reselect';

const COMPETITION_COUNTRIES = [
  {
    title: 'International',
    leagueCodes: ['CL'],
    links: [],
    isActive: false,
  },
  {
    title: 'England',
    leagueCodes: ['PL', 'ELC', 'EL1', 'EL2'],
    links: [],
    isActive: false,
  },
  {
    title: 'France',
    leagueCodes: ['FL1', 'FL2'],
    links: [],
    isActive: false,
  },
  {
    title: 'Germany',
    leagueCodes: ['BL1', 'BL2'],
    links: [],
    isActive: false,
  },
  {
    title: 'Italy',
    leagueCodes: ['SA', 'SB'],
    links: [],
    isActive: false,
  },
  {
    title: 'Netherlands',
    leagueCodes: ['DED'],
    links: [],
    isActive: false,
  },
  {
    title: 'Portugal',
    leagueCodes: ['PPL'],
    links: [],
    isActive: false,
  },
  {
    title: 'Spain',
    leagueCodes: ['PD'],
    links: [],
    isActive: false,
  },
];

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

export const getCompetitionsNav = createSelector(
  (state, locationPathname) => (
    COMPETITION_COUNTRIES.map((country) => {
      const links = getCompetitionsLinks(state, country.leagueCodes);
      const isActive = !!links.find(link => (
        link.to === locationPathname
      ));

      return ({
        ...country,
        links,
        isActive,
      });
    })
  ),
  navSections => navSections,
);

export const getCompetition = (state, id = 0) => (
  state.competitions.entities[id]
);

export const getIsCompetitionsFetching = state => (
  state.competitions.isFetching
);

export const getIsCompetitionsInitialized = state => (
  state.competitions.lastUpdated > 0
);
