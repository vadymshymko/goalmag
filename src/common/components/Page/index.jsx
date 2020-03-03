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
  children: PropTypes.node.isRequired,
  withNav: PropTypes.bool,
};

Page.defaultProps = {
  withNav: true,
};

export default Page;
