import React from 'react';
import PropTypes from 'prop-types';

import './Container.scss';

const Container = ({
  children,
}) => (
  <div className="Container">
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export default Container;
