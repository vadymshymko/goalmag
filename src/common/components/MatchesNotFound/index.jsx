import React, { memo } from 'react';

import { Wrapper, Title, Caption } from './styles';

function MatchesNotFound() {
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Caption>:( There are no games today</Caption>
    </Wrapper>
  );
}

export default memo(MatchesNotFound);
