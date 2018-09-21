import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetitionName,
  getCompetitionCurrentMatchDay,
  getFixtures,
  getStandings,
  getIsFixturesFetching,
} from 'selectors';

import {
  fetchStandings,
  fetchFixtures,
} from 'actions';

import CompetitionPage from 'components/CompetitionPage';

const mapStateToProps = (state, {
  match,
  location: {
    search,
  },
}) => {
  const id = parseInt(match.params.id, 10);
  const name = getCompetitionName(state, id);
  const currentMatchday = getCompetitionCurrentMatchDay(state, id);

  const {
    fixturesDate = Date.now(),
    standingsMatchday = currentMatchday,
  } = parse(search);

  const fixturesDateValue = moment(fixturesDate).format('YYYY-MM-DD');
  const fixtures = getFixtures(state, `competitions/${id}/matches?dateFrom=${fixturesDateValue}&dateTo=${fixturesDateValue}`);

  // const standings = getStandings(state, `${id}-${standingsMatchday}`);

  return {
    id,
    name,
    standings: [],
    standingsMatchday: parseInt(standingsMatchday, 10),
    fixtures,
    fixturesDate: fixturesDateValue,
    isFixturesFetching: getIsFixturesFetching(state),
    currentMatchday,
  };
};

const actions = {
  fetchStandings,
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(CompetitionPage);
