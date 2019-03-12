import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetitionsItems,
  getFixturesItems,
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

  const competitionsItems = getCompetitionsItems(state);
  const fixturesDate = moment(date || Date.now()).format('YYYY-MM-DD');
  const fixturesStateId = `${competitionId || 'all'}-${fixturesDate}`;
  const fixturesItems = getFixturesItems(state, fixturesStateId);
  const isFixturesFetching = getIsFixturesFetching(state, fixturesStateId);
  const isFixturesInitialized = getIsFixturesInitialized(state, fixturesStateId);

  return {
    competitionsItems,
    competitionId,
    date,
    fixturesItems,
    isFixturesFetching,
    isFixturesInitialized,
  };
};

const MatchCenterPageContainer = connect(mapStateToProps)(MatchCenterPage);

export default MatchCenterPageContainer;
