import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styles';

function PageTitle({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitle;
