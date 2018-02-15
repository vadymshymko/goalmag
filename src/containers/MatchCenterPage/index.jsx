import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import MatchCenterCompetitionsList from 'components/MatchCenterCompetitionsList';
import Alert from 'components/Alert';

import { fetchFixtures } from 'actions';
import { getFixturesCompetitionsIds, getCompetition, getIsFixturesFetching } from 'selectors';

class MatchCenterPage extends Component {
  static propTypes = {
    fixturesCompetitions: PropTypes.arrayOf(PropTypes.object),
    fetchFixtures: PropTypes.func.isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    fixturesCompetitions: [],
  }

  componentDidMount() {
    const currentDate = new Date().toISOString().split('T')[0];

    this.props.fetchFixtures({
      dateFrom: currentDate,
      dateTo: currentDate,
    });
  }

  render() {
    const {
      fixturesCompetitions,
      isFixturesFetching,
    } = this.props;

    return (
      <AppPage title="Match Center">
        <AppPageTitle>Match Center</AppPageTitle>

        <AppPageContent>
          {fixturesCompetitions.length > 0 && (
            <MatchCenterCompetitionsList competitions={fixturesCompetitions} />
          )}

          {!isFixturesFetching && fixturesCompetitions.length === 0 && (
            <Alert>:( There are no matches</Alert>
          )}
        </AppPageContent>

      </AppPage>
    );
  }
}

const mapStateToProps = state => ({
  fixturesCompetitions: getFixturesCompetitionsIds(state).map(competitionId => (
    getCompetition(state, competitionId)
  )),
  isFixturesFetching: getIsFixturesFetching(state),
});

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
