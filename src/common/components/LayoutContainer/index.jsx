import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styles';

function LayoutContainer({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

LayoutContainer.propTypes = {
  children: PropTypes.node,
};

LayoutContainer.defaultProps = {
  children: null,
};

export default LayoutContainer;
