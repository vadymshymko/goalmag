import React from 'react';
import PropTypes from 'prop-types';

import './AppPageContent.scss';

const AppPageContent = ({
  children,
}) => (
  <div className="AppPageContent">
    {children}
  </div>
);

AppPageContent.propTypes = {
  children: PropTypes.node,
};

AppPageContent.defaultProps = {
  children: null,
};

export default AppPageContent;
