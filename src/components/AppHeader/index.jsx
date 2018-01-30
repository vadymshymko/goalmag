import React from 'react';
import { Link } from 'react-router-dom';

import AppNav from 'containers/AppNav';
import Container from 'components/Container';
import AppLogo from 'components/AppLogo';

import './AppHeader.scss';

const AppHeader = () => (
  <header className="AppHeader">
    <Container>
      <Link
        className="AppHeader__link"
        to="/"
        href="/"
        title="Go To Homepage"
      >
        <AppLogo />
      </Link>

      <AppNav />
    </Container>
  </header>
);

export default AppHeader;
