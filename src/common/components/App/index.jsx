import React, { Component } from 'react';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppSidebar from 'components/AppSidebar';
import AppInnerContainer from 'containers/AppInnerContainer';

import './App.scss';

export default class App extends Component {
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
      <div className="App">
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
