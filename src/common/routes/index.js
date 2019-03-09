import loadable from '@loadable/component';

import {
  fetchStandings,
  fetchFixtures,
  fetchTeam,
} from 'actions';

const MatchCenterPage = loadable(() => import('containers/MatchCenterPageContainer'));
const CompetitionPage = loadable(() => import('containers/CompetitionPageContainer'));
const TeamPage = loadable(() => import('containers/TeamPageContainer'));
const NotFoundPage = loadable(() => import('components/NotFoundPage'));

const routes = [
  {
    path: '/match-center',
    Component: MatchCenterPage,
    strict: true,
    exact: true,
    fetchData: (dispatch, params = {}) => {
      const {
        competitionId,
        date,
      } = params;

      return dispatch(fetchFixtures({
        competitionId,
        date,
      }));
    },
  },
  {
    path: '/competition/:id(\\d+)',
    Component: CompetitionPage,
    strict: true,
    exact: true,
    fetchData: (dispatch, params = {}) => {
      const {
        id,
        fixturesDate,
        standingsMatchday,
      } = params;

      return Promise.all([
        dispatch(fetchStandings({
          competitionId: id,
          matchday: standingsMatchday,
        })),
        dispatch(fetchFixtures({
          competitionId: id,
          date: fixturesDate,
        })),
      ]);
    },
  },
  {
    path: '/team/:id(\\d+)',
    Component: TeamPage,
    strict: true,
    exact: true,
    fetchData: (dispatch, params = {}) => {
      const {
        id,
      } = params;

      return dispatch(fetchTeam(id));
    },
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];

export default routes;
