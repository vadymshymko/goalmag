import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'components/Container';
import AppLogo from 'components/AppLogo';

import './AppHeader.scss';

const AppHeader = ({ onRequestShowNav }) => (
  <header className="AppHeader">
    <Container>
      <button
        className="AppHeader__showNavBtn"
        type="button"
        title="Show Nav"
        onClick={onRequestShowNav}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          className="AppHeader__showNavIcon"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <Link
        className="AppHeader__link"
        to="/"
        href="/"
        title="Go To Homepage"
      >
        <AppLogo />
      </Link>
    </Container>
  </header>
);

AppHeader.propTypes = {
  onRequestShowNav: PropTypes.func.isRequired,
};

export default AppHeader;
