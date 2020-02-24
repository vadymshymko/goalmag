import HomePage from 'components/HomePage';
import NotFoundPage from 'components/NotFoundPage';

import { fetchCompetitions, fetchMatches } from 'actions';

const routes = [
  {
    id: 'homePage',
    path: '/',
    exact: true,
    strict: true,
    component: HomePage,
    loadData: async (dispatch, routerProps) => {
      return Promise.all([
        dispatch(fetchCompetitions(routerProps)),
        dispatch(fetchMatches(routerProps)),
      ]);
    },
  },
  {
    id: 'notFoundPage',
    component: NotFoundPage,
  },
];

export default routes;
