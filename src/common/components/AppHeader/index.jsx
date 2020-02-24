import React, { memo, useState } from 'react';

import LayoutContainer from 'components/LayoutContainer';
import Logo from 'components/Logo';
import AppNav from 'components/AppNav';

import { Wrapper, Inner, Title, AppNavToggleBtn } from './styles';

function AppHeader() {
  const [showAppNav, toggleAppNav] = useState(false);

  const handleToggleAppNav = () => {
    toggleAppNav(!showAppNav);
  };

  return (
    <Wrapper>
      <LayoutContainer>
        <Inner>
          <Logo />
          <Title>Goalmag</Title>

          <AppNavToggleBtn
            type="button"
            onClick={handleToggleAppNav}
            title="Toggle Navigation"
          />

          <AppNav show={showAppNav} />
        </Inner>
      </LayoutContainer>
    </Wrapper>
  );
}

export default memo(AppHeader);
