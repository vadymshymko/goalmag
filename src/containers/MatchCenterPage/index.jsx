import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFixtures } from 'actions';
import { getFixturesItemsdGroupedByCompetition } from 'selectors';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import MatchCenterList from 'components/MatchCenterList';

class MatchCenterPage extends Component {
  static propTypes = {
    fixturesItems: PropTypes.objectOf(PropTypes.array).isRequired,
    getFixtures: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFixtures();
  }

  render() {
    const {
      fixturesItems,
    } = this.props;

    return (
      <AppPage title="Match Center">
        <AppPageTitle>Match Center</AppPageTitle>

        <MatchCenterList fixturesItems={fixturesItems} />

      </AppPage>
    );
  }
}

const mapStateToProps = state => ({
  fixturesItems: getFixturesItemsdGroupedByCompetition(state),
});

const actions = {
  getFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
