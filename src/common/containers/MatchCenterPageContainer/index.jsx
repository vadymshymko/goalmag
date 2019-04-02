import { connect } from 'react-redux';
import { parse } from 'query-string';

import { getFormattedDate } from 'utils';

import {
  getCompetitionsItems,
  getFixturesItemsToShow,
  getFixturesFilterIsFetching,
  getFixturesFilterIsInitialized,
  getFixturesFilterIsAllFinished,
  FIXTURES_STATUSES_ITEMS,
} from 'selectors';

import MatchCenterPage from 'components/MatchCenterPage';

const mapStateToProps = (state, props) => {
  const {
    location: {
      search,
    },
  } = props;

  const {
    competitionId = '',
    date = Date.now(),
    status = '',
  } = parse(search);

  const fixturesDate = getFormattedDate(date);
  const fixturesFilterStateId = `all-${fixturesDate}`;

  return {
    competitionsItems: getCompetitionsItems(state),
    competitionId,
    date: fixturesDate,
    status,
    fixturesItems: getFixturesItemsToShow(state, { competitionId, date: fixturesDate, status }),
    fixturesStatusesItems: FIXTURES_STATUSES_ITEMS,
    isAllFixturesFinished: getFixturesFilterIsAllFinished(state, fixturesFilterStateId),
    isFixturesFetching: getFixturesFilterIsFetching(state, fixturesFilterStateId),
    isFixturesInitialized: getFixturesFilterIsInitialized(state, fixturesFilterStateId),
  };
};

const MatchCenterPageContainer = connect(mapStateToProps)(MatchCenterPage);

export default MatchCenterPageContainer;
