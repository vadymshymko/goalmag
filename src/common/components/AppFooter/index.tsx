import React, { memo } from 'react';

import LayoutContainer from 'components/LayoutContainer';

import { Wrapper, Inner, Copyright, Links, Link, LinkIcon } from './styles';

function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <Wrapper>
      <LayoutContainer>
        <Inner>
          <Copyright>
            &copy;
            {`${year} soccerin.web.app`}
          </Copyright>

          <Links>
            <Link
              href="https://github.com/vadymshymko/goalmag"
              title="Source code"
              target="_blank"
            >
              <LinkIcon name="github" />
            </Link>
          </Links>
        </Inner>
      </LayoutContainer>
    </Wrapper>
  );
}

export default memo(AppFooter);
