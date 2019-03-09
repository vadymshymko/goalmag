import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetitionName,
  getCompetitionCurrentMatchDay,
  getFixtures,
  getIsFixturesFetching,
  getIsFixturesInitialized,
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

  const name = getCompetitionName(state, id);
  const currentMatchday = getCompetitionCurrentMatchDay(state, id);

  const {
    fixturesDate,
    standingsMatchday,
  } = parse(search);

  const fixturesDateValue = moment(fixturesDate || Date.now()).format('YYYY-MM-DD');
  const fixturesStateId = `${id}-${fixturesDateValue}`;
  const fixtures = getFixtures(state, fixturesStateId);

  const standingsId = `${id}-${standingsMatchday || currentMatchday}`;
  const standingsTable = getStandingsTable(state, standingsId);
  const isStandingsInitialized = getIsStandingsInitialized(state, standingsId);

  return {
    id,
    name,
    fixtures,
    fixturesDate,
    isFixturesFetching: getIsFixturesFetching(state, fixturesStateId),
    isFixturesInitialized: getIsFixturesInitialized(state, fixturesStateId),
    standingsTable,
    currentMatchday,
    standingsMatchday,
    isStandingsInitialized,
  };
};

const CompetitionPageContainer = connect(mapStateToProps)(CompetitionPage);

export default CompetitionPageContainer;
