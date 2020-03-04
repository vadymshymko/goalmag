import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styles';

function TableWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

TableWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableWrapper;
