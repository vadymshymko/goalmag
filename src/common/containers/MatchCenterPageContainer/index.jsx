import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetitionsItems,
  getFixturesItemsToShow,
  getFixturesFilterIsFetching,
  getFixturesFilterIsInitialized,
  getFixturesFilterIsAllFinished,
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

  const fixturesDate = moment(date || Date.now()).format('YYYY-MM-DD');
  const fixturesFilterStateId = `all-${fixturesDate}`;

  return {
    competitionsItems: getCompetitionsItems(state),
    competitionId,
    date,
    fixturesItems: getFixturesItemsToShow(state, { competitionId, date: fixturesDate }),
    isAllFixturesFinished: getFixturesFilterIsAllFinished(state, fixturesFilterStateId),
    isFixturesFetching: getFixturesFilterIsFetching(state, fixturesFilterStateId),
    isFixturesInitialized: getFixturesFilterIsInitialized(state, fixturesFilterStateId),
  };
};

const MatchCenterPageContainer = connect(mapStateToProps)(MatchCenterPage);

export default MatchCenterPageContainer;
