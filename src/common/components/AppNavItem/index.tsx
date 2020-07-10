import React from 'react';

import AppNavLink from 'components/AppNavLink';

import Wrapper from './styles';

export type Props = {
  href: string;
  name: string;
};

export function AppNavItem({ href, name }: Props) {
  return (
    <Wrapper>
      <AppNavLink to={href} href={href} title={name}>
        {name}
      </AppNavLink>
    </Wrapper>
  );
}

export default AppNavItem;
