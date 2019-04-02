import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LayoutContainer from 'components/LayoutContainer';
import AppTitle from 'components/AppTitle';
import AppMenu from 'components/AppMenu';

import styles from './AppHeader.scss';

class AppHeader extends Component {
  state = {
    showMenu: false,
  }

  openMenu = () => {
    this.setState(() => ({
      showMenu: true,
    }));
  }

  closeMenu = () => {
    this.setState(() => ({
      showMenu: false,
    }));
  }

  render() {
    const { showMenu } = this.state;

    return (
      <header className={styles.AppHeader}>
        <LayoutContainer>
          <button
            className={styles.AppHeader__showNavBtn}
            type="button"
            title="Show Navigation"
            onClick={this.openMenu}
            aria-label="Show Navigation"
          >
            <svg
              fill="none"
              viewBox="0 0 20 16"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className={styles.AppHeader__showNavIcon}
            >
              <line x1="0" y1="2" x2="20" y2="2" />
              <line x1="0" y1="8" x2="20" y2="8" />
              <line x1="0" y1="14" x2="20" y2="14" />
            </svg>
          </button>

          <AppTitle />

          <AppMenu isVisible={showMenu} onRequestHide={this.closeMenu} />
        </LayoutContainer>
      </header>
    );
  }
}

export default withStyles(styles)(AppHeader);
