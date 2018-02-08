import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchFixtures } from 'actions';
import { getFixturesItemsdGroupedByCompetition } from 'selectors';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import MatchCenterList from 'components/MatchCenterList';

class MatchCenterPage extends Component {
  static propTypes = {
    fixturesItems: PropTypes.objectOf(PropTypes.array).isRequired,
    fetchFixtures: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchFixtures();
  }

  render() {
    const {
      fixturesItems,
    } = this.props;

    return (
      <AppPage title="Match Center">
        <AppPageTitle>Match Center</AppPageTitle>

        <AppPageContent>
          <MatchCenterList fixturesItems={fixturesItems} />
        </AppPageContent>

      </AppPage>
    );
  }
}

const mapStateToProps = state => ({
  fixturesItems: getFixturesItemsdGroupedByCompetition(state),
});

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
