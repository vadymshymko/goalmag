import React from 'react';

import Wrapper from './styles';

function StatsTable(props) {
  /* eslint-disable react/jsx-props-no-spreading */
  return <Wrapper {...props} />;
  /* eslint-enable react/jsx-props-no-spreading */
}

export default StatsTable;
