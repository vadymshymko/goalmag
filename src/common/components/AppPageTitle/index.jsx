import React from 'react';
import PropTypes from 'prop-types';

import './AppPageTitle.scss';

const AppPageTitle = ({
  children,
}) => (
  <h1 className="AppPageTitle">
    {children}
  </h1>
);

AppPageTitle.propTypes = {
  children: PropTypes.node,
};

AppPageTitle.defaultProps = {
  children: null,
};

export default AppPageTitle;
