import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFixtures } from 'actions';

import AppPage from 'components/AppPage';
import FixturesList from 'components/FixturesList';

class LivePage extends Component {
  static propTypes = {
    fixturesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      <AppPage title="Live Results">
        <h1>Live!</h1>

        <FixturesList fixturesItems={fixturesItems} />
      </AppPage>
    );
  }
}

const mapStateToProps = state => ({
  fixturesItems: state.fixtures.items,
});

const actions = {
  getFixtures,
};

export default connect(mapStateToProps, actions)(LivePage);
