import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import { fetchFixtures } from 'actions';

import {
  getCompetitions,
  getFixtures,
  getIsFixturesFetching,
  getIsFixturesInitialized,
} from 'selectors';

import MatchCenterPage from 'components/MatchCenterPage';

const mapStateToProps = (state, {
  location: {
    search,
  },
}) => {
  const {
    competition,
    date,
  } = parse(search);

  const searchParams = {
    competitionId: parseInt(competition || 0, 10),
    date: moment(date || Date.now()).format('YYYY-MM-DD'),
  };

  const competitions = getCompetitions(state);
  const requestPath = `${searchParams.competitionId ? `competitions/${searchParams.competitionId}` : ''}/matches?dateFrom=${searchParams.date}&dateTo=${searchParams.date}`;
  const fixtures = getFixtures(state, requestPath);
  const isFixturesFetching = getIsFixturesFetching(state, requestPath);
  const isFixturesInitialized = getIsFixturesInitialized(state, requestPath);

  return {
    competitions,
    searchParams,
    fixtures,
    isFixturesFetching,
    isFixturesInitialized,
  };
};

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
