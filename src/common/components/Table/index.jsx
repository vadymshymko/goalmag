import React from 'react';

import Wrapper from './styles';

function Table(props) {
  /* eslint-disable react/jsx-props-no-spreading */
  return <Wrapper {...props} />;
  /* eslint-enable react/jsx-props-no-spreading */
}

export default Table;
