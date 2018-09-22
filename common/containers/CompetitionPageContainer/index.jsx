import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetitionName,
  getCompetitionCurrentMatchDay,
  getFixtures,
  getIsFixturesFetching,
  getStandingsTable,
  getIsStandingsInitialized,
} from 'selectors';

import {
  fetchStandings,
  fetchFixtures,
} from 'actions';

import CompetitionPage from 'components/CompetitionPage';

const mapStateToProps = (state, props) => {
  const id = parseInt(props.match.params.id, 10);
  const name = getCompetitionName(state, id);
  const currentMatchday = getCompetitionCurrentMatchDay(state, id);

  const {
    fixturesDate = Date.now(),
    standingsMatchday = currentMatchday,
  } = parse(props.location.search);

  const fixturesDateValue = moment(fixturesDate).format('YYYY-MM-DD');
  const fixturesStateId = `${id}-${fixturesDateValue}`;
  const fixtures = getFixtures(state, fixturesStateId);

  const standingsId = `${id}-${standingsMatchday}`;
  const standingsTable = getStandingsTable(state, standingsId);
  const isStandingsInitialized = getIsStandingsInitialized(state, standingsId);

  return {
    id,
    name,
    currentMatchday,
    fixtures,
    fixturesDate: fixturesDateValue,
    isFixturesFetching: getIsFixturesFetching(state),
    standingsMatchday: parseInt(standingsMatchday, 10),
    standingsTable,
    isStandingsInitialized,
  };
};

const actions = {
  fetchStandings,
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(CompetitionPage);
