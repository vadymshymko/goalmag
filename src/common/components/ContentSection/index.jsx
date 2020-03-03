import React from 'react';

import Wrapper from './styles';

/* eslint-disable react/jsx-props-no-spreading */
function ContentSection(props) {
  return <Wrapper {...props} />;
}
/* eslint-enable react/jsx-props-no-spreading */

export default ContentSection;
