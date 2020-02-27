import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styles';

function PageContent({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
