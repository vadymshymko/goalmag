import React from 'react';
import PropTypes from 'prop-types';

import AppNav from 'components/AppNav';
import LayoutContainer from 'components/LayoutContainer';

import { Wrapper, Inner, Content } from './styles';

function Page({ children, withNav }) {
  return (
    <Wrapper>
      <LayoutContainer>
        <Inner>
          {withNav && <AppNav />}

          <Content>{children}</Content>
        </Inner>
      </LayoutContainer>
    </Wrapper>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  withNav: PropTypes.bool,
};

Page.defaultProps = {
  children: null,
  withNav: true,
};

export default Page;
