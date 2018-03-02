import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCompetitions } from 'actions';

import {
  getCompetitionsNav,
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
    isCompetitionsInitialized: PropTypes.bool.isRequired,
    navSections: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.node,
  }

  static defaultProps = {
    navSections: [],
    children: null,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
  }

  render() {
    const {
      navSections,
      isCompetitionsInitialized,
      children,
    } = this.props;

    return (
      <div className="App">
        <AppHeader />

        <div className="App__content">
          <Container>
            <AppNav navSections={navSections} />

            <AppInner isCompetitionsInitialized={isCompetitionsInitialized}>
              {children}
            </AppInner>
          </Container>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const locationPathname = props.location.pathname;

  return {
    isCompetitionsInitialized: getIsCompetitionsInitialized(state),
    navSections: [
      {
        title: '',
        links: [
          {
            to: '/match-center',
            title: 'Match Center',
          },
        ],
        isActive: locationPathname === '/match-center',
      },
      ...getCompetitionsNav(state, locationPathname),
    ],
  };
};

const actions = {
  fetchCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(App));
