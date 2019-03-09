import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import routes from 'routes';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppSidebar from 'components/AppSidebar';

import styles from './App.scss';

class App extends Component {
  state = {
    showSidebar: false,
  }

  openSidebar = () => {
    this.setState(() => ({
      showSidebar: true,
    }));
  }

  closeSidebar = () => {
    this.setState(() => ({
      showSidebar: false,
    }));
  }

  render() {
    const { showSidebar } = this.state;

    return (
      <div className={styles.App}>
        <AppHeader onRequestOpenSidebar={this.openSidebar} />

        <Container>
          <AppSidebar
            isVisible={showSidebar}
            onRequestHide={this.closeSidebar}
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

export default withStyles(styles)(App);
