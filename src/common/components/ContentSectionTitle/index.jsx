import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styles';

function ContentSectionTitle({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

ContentSectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentSectionTitle;
