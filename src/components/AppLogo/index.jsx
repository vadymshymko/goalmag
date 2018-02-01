import React from 'react';
import './AppLogo.scss';

const AppLogo = () => (
  <span
    className="AppLogo"
    title="Goal Magazine"
  >
    <span className="AppLogo__icon" />
    <span
      style={{
        width: '100%',
      }}
    />
    <strong className="AppLogo__title">Goal Magazine</strong>
  </span>
);

export default AppLogo;
