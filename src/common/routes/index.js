import loadable from '@loadable/component';

import {
  fetchStandings,
  fetchFixtures,
  fetchTeam,
  // fetchCompetitions,
} from 'actions';

const MatchCenterPage = loadable(() => import('containers/MatchCenterPageContainer'));
const CompetitionPage = loadable(() => import('containers/CompetitionPageContainer'));
const TeamPage = loadable(() => import('containers/TeamPageContainer'));
const NotFoundPage = loadable(() => import('components/NotFoundPage'));

const routes = [
  {
    path: '/',
    Component: MatchCenterPage,
    strict: true,
    exact: true,
    props: {
      fetchData: (dispatch, params = {}) => {
        const {
          date,
        } = params;

        return Promise.all([
          dispatch(fetchFixtures({
            date,
          })),
          // dispatch(fetchCompetitions()),
        ]);
      },
    },
  },
  {
    path: '/competition/:id([0-9]{4})',
    Component: CompetitionPage,
    strict: true,
    exact: true,
    props: {
      fetchData: (dispatch, params = {}) => {
        const {
          id,
          fixturesDate,
        } = params;

        return Promise.all([
          dispatch(fetchStandings({
            competitionId: id,
          })),
          dispatch(fetchFixtures({
            competitionId: id,
            date: fixturesDate,
          })),
          // dispatch(fetchCompetitions()),
        ]);
      },
    },
  },
  {
    path: '/team/:id(\\d+)',
    Component: TeamPage,
    strict: true,
    exact: true,
    props: {
      fetchData: (dispatch, params = {}) => {
        const {
          id,
        } = params;

        return Promise.all([
          dispatch(fetchTeam(id)),
          // dispatch(fetchCompetitions()),
        ]);
      },
    },
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];

export default routes;
