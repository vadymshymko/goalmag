import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import { fetchFixtures } from 'actions';

import {
  getCompetitions,
  getFixtures,
  getIsFixturesFetching,
  getIsFixturesInitialized,
} from 'selectors';

import MatchCenterPage from 'components/MatchCenterPage';

class MatchCenterPageContainer extends Component {
  static propTypes = {
    competitionId: PropTypes.number,
    date: PropTypes.string,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    competitionId: null,
    date: null,
  }

  static fetchData(dispatch, pathParams, queryParams = {}) {
    const {
      competitionId,
      date,
    } = queryParams;

    return dispatch(fetchFixtures({
      competitionId,
      date,
    }));
  }

  componentDidMount() {
    const {
      competitionId,
      date,
      dispatch,
    } = this.props;

    MatchCenterPageContainer.fetchData(
      dispatch,
      undefined,
      {
        competitionId,
        date,
      },
    );
  }

  componentDidUpdate(prevProps) {
    const {
      competitionId,
      date,
      dispatch,
    } = this.props;

    const {
      competitionId: prevCompetition,
      date: prevDate,
    } = prevProps;

    if (
      competitionId !== prevCompetition
      || date !== prevDate
    ) {
      MatchCenterPageContainer.fetchData(
        dispatch,
        undefined,
        {
          competitionId,
          date,
        },
      );
    }
  }

  render() {
    const {
      competitionId,
      date,
      fixtures,
      isFixturesFetching,
      isFixturesInitialized,
      competitions,
      history: {
        push,
      },
    } = this.props;

    return (
      <MatchCenterPage
        competitionId={competitionId}
        date={date}
        fixtures={fixtures}
        isFixturesFetching={isFixturesFetching}
        isFixturesInitialized={isFixturesInitialized}
        competitions={competitions}
        historyPush={push}
      />
    );
  }
}

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

export default connect(mapStateToProps)(MatchCenterPageContainer);
