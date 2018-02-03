import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFixtures } from 'actions';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import LiveFixturesList from 'components/LiveFixturesList';

class LivePage extends Component {
  static propTypes = {
    fixturesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    getFixtures: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFixtures();
  }

  getSortedFixturesItems = fixturesItems => (
    fixturesItems.reduce((result, item) => {
      if (!result[item.links.competition.href]) {
        return {
          ...result,
          [item.links.competition.href]: [
            item,
          ],
        };
      }

      return {
        ...result,
        [item.links.competition.href]: [
          item,
          ...result[item.links.competition.href],
        ],
      };
    }, {})
  )

  render() {
    const {
      fixturesItems,
    } = this.props;

    const sortedFixturesItems = this.getSortedFixturesItems(fixturesItems);

    return (
      <AppPage title="Live Results">
        <AppPageTitle>Live Results</AppPageTitle>

        <LiveFixturesList fixturesItems={sortedFixturesItems} />

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
