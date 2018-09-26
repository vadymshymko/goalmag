import React from 'react';
import { Link } from 'react-router-dom';

import AppLogo from 'components/AppLogo';

import './AppTitle.scss';

const AppTitle = () => (
  <h1 className="AppTitle">
    <Link
      className="AppTitle__link"
      to="/"
      href="/"
      title="Go To Homepage"
    >
      <AppLogo />

      Goal Magazine
    </Link>
  </h1>
);

export default AppTitle;
