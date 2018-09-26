const getRoutes = ({
  MatchCenterPage,
  CompetitionPage,
  TeamPage,
  NotFoundPage,
}) => ([
  {
    path: '/match-center',
    component: MatchCenterPage,
    strict: true,
    exact: true,
  },
  {
    path: '/competition/:id(\\d+)',
    component: CompetitionPage,
    strict: true,
    exact: true,
  },
  {
    path: '/team/:id(\\d+)',
    component: TeamPage,
    strict: true,
    exact: true,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
]);

export default getRoutes;
