import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import Container from 'components/Container';
import AppTitle from 'components/AppTitle';

import styles from './AppHeader.scss';

const AppHeader = ({ onRequestShowNav }) => (
  <header className={styles.AppHeader}>
    <Container>
      <button
        className={styles.AppHeader__showNavBtn}
        type="button"
        title="Show Navigation"
        onClick={onRequestShowNav}
        aria-label="Show Navigation"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          className={styles.AppHeader__showNavIcon}
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <AppTitle />
    </Container>
  </header>
);

AppHeader.propTypes = {
  onRequestShowNav: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppHeader);
