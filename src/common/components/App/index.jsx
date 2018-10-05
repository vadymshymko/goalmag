import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { hot } from 'react-hot-loader';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppSidebar from 'components/AppSidebar';
import AppInnerContainer from 'containers/AppInnerContainer';

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
    return (
      <div className={styles.App}>
        <AppHeader onRequestShowNav={this.showAppNav} />

        <Container>
          <AppSidebar
            showContent={this.state.showAppNav}
            onRequestHide={this.hideAppNav}
          />

          <AppInnerContainer />
        </Container>
      </div>
    );
  }
}

export default hot(module)(withStyles(styles)(App));
