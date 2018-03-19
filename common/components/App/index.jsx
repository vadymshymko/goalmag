import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import MatchCenterPageContainer from 'containers/MatchCenterPageContainer';
import CompetitionPageContainer from 'containers/CompetitionPageContainer';
import TeamPageContainer from 'containers/TeamPageContainer';
import NotFoundPage from 'components/NotFoundPage';
import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppNav from 'components/AppNav';
import AppInner from 'components/AppInner';

import './App.scss';

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
                component={MatchCenterPageContainer}
              />

              <Route
                strict
                exact
                path="/competition/:id"
                component={CompetitionPageContainer}
              />

              <Route
                strict
                exact
                path="/team/:id"
                component={TeamPageContainer}
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
