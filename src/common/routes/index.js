import loadable from '@loadable/component';

import {
  fetchCompetitions,
  fetchMatches,
  fetchMatch,
  fetchMatchCommentaries,
  fetchCompetitionStandings,
  fetchTeam,
  fetchPlayer,
} from 'actions';

const MatchCenterPage = loadable(() => import('components/MatchCenterPage'));
const CompetitionPage = loadable(() => import('components/CompetitionPage'));
const MatchPage = loadable(() => import('components/MatchPage'));
const TeamPage = loadable(() => import('components/TeamPage'));
const PlayerPage = loadable(() => import('components/PlayerPage'));
const NotFoundPage = loadable(() => import('components/NotFoundPage'));

const routes = [
  {
    id: 'homePage',
    path: '/',
    exact: true,
    strict: true,
    component: MatchCenterPage,
    props: {
      initialAction: async (dispatch, params) => {
        return Promise.all([
          dispatch(fetchCompetitions(params)),
          dispatch(fetchMatches(params)),
        ]);
      },
    },
  },
  {
    id: 'competitionPage',
    path: '/competitions/:competitionId',
    exact: true,
    strict: true,
    component: CompetitionPage,
    props: {
      initialAction: async (dispatch, params) => {
        return Promise.all([
          dispatch(fetchCompetitions(params)),
          dispatch(fetchMatches(params)),
          dispatch(fetchCompetitionStandings(params)),
        ]);
      },
    },
  },
  {
    id: 'matchPage',
    path: '/matches/:matchId',
    exact: true,
    strict: true,
    component: MatchPage,
    props: {
      initialAction: async (dispatch, params) => {
        return Promise.all([
          dispatch(fetchCompetitions(params)),
          dispatch(fetchMatch(params)),
          dispatch(fetchMatchCommentaries(params)),
        ]);
      },
    },
  },
  {
    id: 'teamPage',
    path: '/teams/:teamId',
    exact: true,
    strict: true,
    component: TeamPage,
    props: {
      initialAction: async (dispatch, params) => {
        return Promise.all([
          dispatch(fetchCompetitions(params)),
          dispatch(fetchTeam(params)),
        ]);
      },
    },
  },
  {
    id: 'playerPage',
    path: '/players/:playerId',
    exact: true,
    strict: true,
    component: PlayerPage,
    props: {
      initialAction: async (dispatch, params) => {
        return Promise.all([
          dispatch(fetchCompetitions(params)),
          dispatch(fetchPlayer(params)),
        ]);
      },
    },
  },
  {
    id: 'notFoundPage',
    component: NotFoundPage,
    props: {},
  },
];

export default routes;
