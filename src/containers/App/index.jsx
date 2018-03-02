import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCompetitions } from 'actions';

import {
  getCompetitions,
  getIsCompetitionsInitialized,
} from 'selectors';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppNav from 'components/AppNav';
import AppInner from 'components/AppInner';

import './App.scss';

class App extends Component {
  static propTypes = {
    fetchCompetitions: PropTypes.func.isRequired,
    locationPathname: PropTypes.string.isRequired,
    isCompetitionsInitialized: PropTypes.bool.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.node,
  }

  static defaultProps = {
    competitions: [],
    children: null,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
  }

  render() {
    const {
      locationPathname,
      competitions,
      isCompetitionsInitialized,
      children,
    } = this.props;

    return (
      <div className="App">
        <AppHeader />

        <div className="App__content">
          <Container>
            <AppNav
              locationPathname={locationPathname}
              competitions={competitions}
            />

            <AppInner isCompetitionsInitialized={isCompetitionsInitialized}>
              {children}
            </AppInner>
          </Container>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  locationPathname: props.location.pathname,
  isCompetitionsInitialized: getIsCompetitionsInitialized(state),
  competitions: getCompetitions(state),
});

const actions = {
  fetchCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(App));
