import React from 'react';

import Wrapper from './styles';

export type Props = {
  title: string;
  href: string;
  children: React.ReactNode;
};

export function AppNavLink({ href, title, children }: Props) {
  return (
    <Wrapper to={href} href={href} title={title} exact strict>
      {children}
    </Wrapper>
  );
}

export default AppNavLink;
