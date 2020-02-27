import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styles';

function ContentSection({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

ContentSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentSection;
