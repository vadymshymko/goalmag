import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppNav from 'components/AppNav';
import AppInner from 'components/AppInner';

import './App.scss';

export default class App extends Component {
  static propTypes = {
    fetchCompetitions: PropTypes.func.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.shape({
      pathname: PropTypes.PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    competitions: [],
  }

  state = {
    showAppNav: false,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
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
      competitions,
      location: {
        pathname,
      },
    } = this.props;

    return (
      <div className="App">
        <AppHeader onRequestShowNav={this.showAppNav} />

        <Container>
          <AppNav
            activePathname={pathname}
            competitions={competitions}
            showContent={this.state.showAppNav}
            onRequestHide={this.hideAppNav}
          />

          <AppInner />
        </Container>
      </div>
    );
  }
}
