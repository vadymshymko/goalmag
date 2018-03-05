import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import {
  getCompetition,
  getFixtures,
  getTable,
  getIsFixturesFetching,
} from 'selectors';

import {
  fetchTable,
  fetchFixtures,
} from 'actions';

import CompetitionPage from 'components/CompetitionPage';

const mapStateToProps = (state, {
  match: {
    params: {
      id,
    },
  },
  location: {
    search,
  },
}) => {
  const competitionId = parseInt(id, 10);
  const {
    caption: competitionName = '',
    currentMatchday: competitionMatchday = 0,
    lastUpdated,
  } = getCompetition(state, competitionId) || {};

  const {
    fixturesDate,
    tableMatchday = competitionMatchday,
  } = parse(search);

  const fixturesDateValue = moment(fixturesDate || Date.now()).format('YYYY-MM-DD');

  return {
    competitionId,
    competitionName,
    lastUpdated,
    fixturesDate: fixturesDateValue,
    competitionFixtures: getFixtures(state, {
      competitionId,
      date: fixturesDateValue,
    }),
    isFixturesFetching: getIsFixturesFetching(state),
    currentCompetitionMatchday: competitionMatchday,
    tableMatchday: parseInt(tableMatchday, 10),
    competitionTable: getTable(state, `${competitionId}-${tableMatchday}`),
  };
};

const actions = {
  fetchTable,
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(CompetitionPage);
