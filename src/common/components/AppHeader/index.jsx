import React, { memo, useState } from 'react';

import LayoutContainer from 'components/LayoutContainer';
import Logo from 'components/Logo';
import AppNav from 'components/AppNav';

import { Wrapper, Inner, Title, Caption, NavToggleBtn } from './styles';

function AppHeader() {
  const [showAppNav, toggleAppNav] = useState(false);

  const handleToggleAppNav = () => {
    toggleAppNav(!showAppNav);
  };

  return (
    <Wrapper>
      <LayoutContainer>
        <Inner>
          <NavToggleBtn
            type="button"
            onClick={handleToggleAppNav}
            title="Toggle Navigation"
          />

          <Title>
            <Logo />
            <Caption>Goalmag</Caption>
          </Title>

          <AppNav show={showAppNav} />
        </Inner>
      </LayoutContainer>
    </Wrapper>
  );
}

export default memo(AppHeader);
