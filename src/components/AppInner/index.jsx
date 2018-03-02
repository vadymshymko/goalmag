import React from 'react';
import PropTypes from 'prop-types';

import './AppInner.scss';

const AppInner = ({
  children,
  isCompetitionsInitialized,
}) => (
  <div className="AppInner">
    {isCompetitionsInitialized && children}
  </div>
);

AppInner.propTypes = {
  isCompetitionsInitialized: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

AppInner.defaultProps = {
  children: null,
};

export default AppInner;
