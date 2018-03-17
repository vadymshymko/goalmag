import MatchCenterPageContainer from 'containers/MatchCenterPageContainer';
import CompetitionPageContainer from 'containers/CompetitionPageContainer';
import TeamPageContainer from 'containers/TeamPageContainer';
import NotFoundPage from 'components/NotFoundPage';

const routes = [
  {
    redirect: {
      from: '/',
      to: '/match-center',
    },
  },
  {
    path: '/match-center',
    component: MatchCenterPageContainer,
    strict: true,
    exact: true,
  },
  {
    path: '/competition/:id',
    component: CompetitionPageContainer,
    strict: true,
    exact: true,
  },
  {
    path: '/team/:id',
    component: TeamPageContainer,
    strict: true,
    exact: true,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
