import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/Container';

import './AppHeader.scss';

const AppHeader = () => (
  <header className="AppHeader">
    <Container>
      <Link
        className="AppLogo"
        to="/"
        href="/"
        title="Go To Homepage"
      >
        <i className="AppLogo__icon" />
      </Link>
    </Container>
  </header>
);

export default AppHeader;
