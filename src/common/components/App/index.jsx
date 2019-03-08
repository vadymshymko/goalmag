import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import routes from 'routes';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppSidebar from 'components/AppSidebar';

import styles from './App.scss';

class App extends Component {
  state = {
    showAppNav: false,
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
    const { showAppNav } = this.state;

    return (
      <div className={styles.App}>
        <AppHeader onRequestShowNav={this.showAppNav} />

        <Container>
          <AppSidebar
            showContent={showAppNav}
            onRequestHide={this.hideAppNav}
          />

          <div className={styles.App__Inner}>
            <Switch>
              <Redirect
                strict
                exact
                from="/"
                to="/match-center"
              />

              {routes.map(({ Component: RouteComponent, fetchData, ...routeProps }) => (
                <Route
                  {...routeProps}
                  render={props => (
                    <RouteComponent {...props} fetchData={fetchData} />
                  )}
                  key={routeProps.path}
                />
              ))}
            </Switch>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
