import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

import {
  fetchStandings,
  fetchFixtures,
} from 'actions';

import CompetitionPage from 'components/CompetitionPage';

class CompetitionPageContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    currentMatchday: PropTypes.number.isRequired,
    standingsTable: PropTypes.arrayOf(PropTypes.object).isRequired,
    standingsMatchday: PropTypes.string,
    isStandingsInitialized: PropTypes.bool.isRequired,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixturesDate: PropTypes.string,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    standingsMatchday: null,
    fixturesDate: null,
  }

  static fetchData(dispatch, pathParams = {}, queryParams = {}) {
    const {
      id,
    } = pathParams;

    const {
      fixturesDate,
      standingsMatchday,
    } = queryParams;

    return Promise.all([
      dispatch(fetchStandings({
        competitionId: id,
        matchday: standingsMatchday,
      })),
      dispatch(fetchFixtures({
        competitionId: id,
        date: fixturesDate,
      })),
    ]);
  }

  componentDidMount() {
    const {
      id,
      fixturesDate,
      standingsMatchday,
      dispatch,
    } = this.props;

    CompetitionPageContainer.fetchData(
      dispatch,
      { id },
      {
        fixturesDate,
        standingsMatchday,
      },
    );
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      fixturesDate,
      standingsMatchday,
      dispatch,
    } = this.props;

    const {
      id: prevId,
      fixturesDate: prevFixturesDate,
      standingsMatchday: prevStandingsMatchday,
    } = prevProps;

    const isNewCompetition = id !== prevId;
    const isNewFixturesDate = fixturesDate !== prevFixturesDate;
    const isNewStandingsMatchday = standingsMatchday !== prevStandingsMatchday;

    if (
      isNewCompetition
      || isNewStandingsMatchday
    ) {
      dispatch(fetchStandings({
        competitionId: id,
        matchday: standingsMatchday,
      }));
    }

    if (
      isNewCompetition
      || isNewFixturesDate
    ) {
      dispatch(fetchFixtures({
        competitionId: id,
        date: fixturesDate,
      }));
    }
  }

  render() {
    const {
      name,
      currentMatchday,
      standingsTable,
      standingsMatchday,
      isStandingsInitialized,
      fixtures,
      fixturesDate,
      isFixturesFetching,
      isFixturesInitialized,
      history: {
        push,
      },
    } = this.props;

    return (
      <CompetitionPage
        name={name}
        currentMatchday={currentMatchday}
        standingsTable={standingsTable}
        standingsMatchday={standingsMatchday}
        isStandingsInitialized={isStandingsInitialized}
        fixtures={fixtures}
        fixturesDate={fixturesDate}
        isFixturesFetching={isFixturesFetching}
        isFixturesInitialized={isFixturesInitialized}
        historyPush={push}
      />
    );
  }
}

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

export default connect(mapStateToProps)(CompetitionPageContainer);
