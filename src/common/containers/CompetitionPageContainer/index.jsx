import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetitionName,
  getFixturesItemsToShow,
  getFixturesFilterIsFetching,
  getFixturesFilterIsInitialized,
  getStandingsTable,
  getIsStandingsInitialized,
} from 'selectors';

import CompetitionPage from 'components/CompetitionPage';

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: {
        id,
      },
    },
    location: {
      search,
    },
  } = props;

  const {
    fixturesDate,
    standingsType,
  } = parse(search);

  const fixturesDateValue = moment(fixturesDate || Date.now()).format('YYYY-MM-DD');
  const fixturesStateId = `${id}-${fixturesDateValue}`;

  return {
    id,
    name: getCompetitionName(state, id),
    fixturesItems: getFixturesItemsToShow(state, { competitionId: id, date: fixturesDateValue }),
    fixturesDate,
    isFixturesFetching: getFixturesFilterIsFetching(state, fixturesStateId),
    isFixturesInitialized: getFixturesFilterIsInitialized(state, fixturesStateId),
    standingsTable: getStandingsTable(state, id, standingsType),
    standingsType,
    isStandingsInitialized: getIsStandingsInitialized(state, id),
  };
};

const CompetitionPageContainer = connect(mapStateToProps)(CompetitionPage);

export default CompetitionPageContainer;
