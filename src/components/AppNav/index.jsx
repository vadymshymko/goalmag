import React from 'react';
import PropTypes from 'prop-types';

import AppNavSection from 'components/AppNavSection';

import './AppNav.scss';

const AppNav = ({
  onRequestHide,
  showContent,
  navSections,
}) => (
  <nav className={`AppNav ${showContent ? 'AppNav--visible' : ''}`}>
    <div
      className="AppNav__bg"
      role="presentation"
      onClick={onRequestHide}
    />

    <div className="AppNav__content">
      <div className="AppNavHide">
        <button
          className="AppNavHide__btn"
          type="button"
          onClick={onRequestHide}
          title="Hide Nav"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            className="AppNavHide__icon"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </div>

      {navSections.map(section => (
        <AppNavSection
          key={section.title}
          title={section.title}
          links={section.links}
          isActive={section.isActive}
        />
      ))}
    </div>
  </nav>
);

AppNav.propTypes = {
  onRequestHide: PropTypes.func.isRequired,
  showContent: PropTypes.bool.isRequired,
  navSections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object),
    isActive: PropTypes.bool,
  })).isRequired,
};

export default AppNav;
