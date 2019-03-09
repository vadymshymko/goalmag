import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetitions,
  getFixtures,
  getIsFixturesFetching,
  getIsFixturesInitialized,
} from 'selectors';

import MatchCenterPage from 'components/MatchCenterPage';

const mapStateToProps = (state, props) => {
  const {
    location: {
      search,
    },
  } = props;

  const {
    competitionId,
    date,
  } = parse(search);

  const competitions = getCompetitions(state);
  const fixturesDate = moment(date || Date.now()).format('YYYY-MM-DD');
  const fixturesStateId = `${competitionId || 'all'}-${fixturesDate}`;
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

const MatchCenterPageContainer = connect(mapStateToProps)(MatchCenterPage);

export default MatchCenterPageContainer;
