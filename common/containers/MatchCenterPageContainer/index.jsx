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

const mapStateToProps = (state, props) => {
  const { search } = props.location;
  const searchQuery = parse(search);

  const competitionId = parseInt(searchQuery.competition || 0, 10);
  const date = moment(searchQuery.date || Date.now()).format('YYYY-MM-DD');

  const competitions = getCompetitions(state);
  const fixturesStateId = `${competitionId || 'all'}-${date}`;
  const fixtures = getFixtures(state, fixturesStateId);
  const isFixturesFetching = getIsFixturesFetching(state, fixturesStateId);
  const isFixturesInitialized = getIsFixturesInitialized(state, fixturesStateId);

  return {
    competitions,
    competitionId,
    date,
    fixtures,
    isFixturesFetching,
    isFixturesInitialized,
  };
};

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
