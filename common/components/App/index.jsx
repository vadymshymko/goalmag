import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppNav from 'components/AppNav';
import AppInner from 'components/AppInner';

import Loadable from 'react-loadable';

import './App.scss';

const Loading = () => <div>Loading...</div>;

const MatchCenterPage = Loadable({
  loader: () => import('containers/MatchCenterPageContainer'),
  loading: Loading,
});

const CompetitionPage = Loadable({
  loader: () => import('containers/CompetitionPageContainer'),
  loading: Loading,
});

const TeamPage = Loadable({
  loader: () => import('containers/TeamPageContainer'),
  loading: Loading,
});

const NotFoundPage = Loadable({
  loader: () => import('components/NotFoundPage'),
  loading: Loading,
});

export default class App extends Component {
  static propTypes = {
    fetchCompetitions: PropTypes.func.isRequired,
    locationPathname: PropTypes.string.isRequired,
    competitionsNav: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    competitionsNav: [],
  }

  state = {
    showAppNav: false,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locationPathname !== this.props.locationPathname && this.state.showAppNav) {
      this.hideAppNav();
    }
  }

  showAppNav = () => {
    this.setState(() => ({
      showAppNav: true,
    }));
  }

  hideAppNav = () => {
    this.setState(() => ({
      showAppNav: false,
    }));
  }

  render() {
    const {
      competitionsNav,
      locationPathname,
    } = this.props;

    const navSections = [
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
      ...competitionsNav,
    ];

    return (
      <div className="App">
        <AppHeader onRequestShowNav={this.showAppNav} />

        <Container>
          <AppNav
            showContent={this.state.showAppNav}
            navSections={navSections}
            onRequestHide={this.hideAppNav}
          />

          <AppInner>
            <Route
              exact
              path="/"
              render={() => (
                <Redirect to="match-center" />
              )}
            />

            <Switch>
              <Route
                strict
                exact
                path="/match-center"
                component={MatchCenterPage}
              />

              <Route
                strict
                exact
                path="/competition/:id"
                component={CompetitionPage}
              />

              <Route
                strict
                exact
                path="/team/:id"
                component={TeamPage}
              />

              <Route
                path="*"
                component={NotFoundPage}
              />
            </Switch>
          </AppInner>
        </Container>
      </div>
    );
  }
}
