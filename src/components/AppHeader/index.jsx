import React from 'react';
import { Link } from 'react-router-dom';

import AppLogo from 'components/AppLogo';

import './AppHeader.scss';

const AppHeader = () => (
  <header className="AppHeader">
    <Link
      className="AppHeader__link"
      to="/"
      href="/"
      title="Go To Homepage"
    >
      <AppLogo />
    </Link>
  </header>
);

export default AppHeader;
