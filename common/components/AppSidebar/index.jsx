import React from 'react';
import PropTypes from 'prop-types';

import AppNavContainer from 'containers/AppNavContainer';
import AppInfo from 'components/AppInfo';

import './AppSidebar.scss';

const AppSidebar = ({
  onRequestHide,
  showContent,
}) => (
  <div className="AppSidebar">
    <div className={`AppSidebar__content ${showContent ? 'AppSidebar__content--visible' : ''}`}>
      <button
        className="AppSidebar__hideBtn"
        type="button"
        onClick={onRequestHide}
        title="Hide Navigation"
        aria-label="Hide Navigation"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          className="AppSidebar__hideIcon"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <AppNavContainer />

      <AppInfo />
    </div>

    <div
      className="AppSidebar__bg"
      role="presentation"
      onClick={onRequestHide}
    />
  </div>
);

AppSidebar.propTypes = {
  onRequestHide: PropTypes.func.isRequired,
  showContent: PropTypes.bool.isRequired,
};

export default AppSidebar;
