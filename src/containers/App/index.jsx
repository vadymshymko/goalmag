import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppHeader from 'components/AppHeader';
import AppNav from 'components/AppNav';
import Container from 'components/Container';

import {
  fetchCompetitions,
  fetchFixtures,
} from 'actions';

import {
  getCompetitions,
  getIsCompetitionsInitialized,
} from 'selectors';

import './App.scss';

class App extends Component {
  static propTypes = {
    fetchCompetitions: PropTypes.func.isRequired,
    fetchFixtures: PropTypes.func.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    isCompetitionsInitialized: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  componentDidMount() {
    const currentDate = new Date().toISOString().split('T')[0];

    this.props.fetchCompetitions();

    this.props.fetchFixtures({
      dateFrom: currentDate,
      dateTo: currentDate,
    });
  }

  render() {
    const {
      children,
      competitions,
      isCompetitionsInitialized,
    } = this.props;

    return (
      <div className="App">
        <AppHeader />

        <div className="App__content">
          <Container>
            <AppNav competitions={competitions} />

            {isCompetitionsInitialized ? (
              children
            ) : (
              <span className="App__loader">
                Loading...
              </span>
            )}
          </Container>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  competitions: getCompetitions(state),
  isCompetitionsInitialized: getIsCompetitionsInitialized(state),
});

const actions = {
  fetchCompetitions,
  fetchFixtures,
};

export default withRouter(connect(mapStateToProps, actions)(App));
