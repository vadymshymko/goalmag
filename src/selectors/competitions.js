const NATIONAL_TEAMS_COMPETITIONS_CODES = [
  'ec',
  'wc',
];

export const getNationalTeamsCompetitions = competitions => (
  competitions.filter(item => (
    !!NATIONAL_TEAMS_COMPETITIONS_CODES.find(code => (
      code === item.league.toLowerCase()
    ))
  ))
);

export const getClubsCompetitions = competitions => (
  competitions.filter(item => (
    !NATIONAL_TEAMS_COMPETITIONS_CODES.find(code => (
      code === item.league.toLowerCase()
    ))
  ))
);
