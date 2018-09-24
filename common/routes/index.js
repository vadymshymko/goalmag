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
    path: '/competition/:id',
    component: CompetitionPage,
    strict: true,
    exact: true,
  },
  {
    path: '/team/:id',
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
