import React from 'react';
import PropTypes from 'prop-types';

import AppNavSection from 'components/AppNavSection';

import './AppNav.scss';

const AppNav = ({ navSections }) => (
  <nav className="AppNav">
    {navSections.map(section => (
      <AppNavSection
        key={section.title}
        title={section.title}
        links={section.links}
        isActive={section.isActive}
      />
    ))}
  </nav>
);

AppNav.propTypes = {
  navSections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object),
    isActive: PropTypes.bool,
  })).isRequired,
};

export default AppNav;
