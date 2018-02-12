import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import MatchCenterCompetitionsList from 'components/MatchCenterCompetitionsList';

import { fetchFixtures } from 'actions';
import { getFixturesCompetitions } from 'selectors';

class MatchCenterPage extends Component {
  static propTypes = {
    fixturesCompetitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchFixtures: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchFixtures();
  }

  render() {
    const {
      fixturesCompetitions,
    } = this.props;

    return (
      <AppPage title="Match Center">
        <AppPageTitle>Match Center</AppPageTitle>

        <AppPageContent>
          <MatchCenterCompetitionsList competitions={fixturesCompetitions} />
        </AppPageContent>

      </AppPage>
    );
  }
}

const mapStateToProps = state => ({
  fixturesCompetitions: getFixturesCompetitions(state),
});

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
