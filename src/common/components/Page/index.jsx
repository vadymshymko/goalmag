import React from 'react';
import PropTypes from 'prop-types';

import LayoutContainer from 'components/LayoutContainer';

import Wrapper from './styles';

function Page({ children }) {
  return (
    <Wrapper>
      <LayoutContainer>{children}</LayoutContainer>
    </Wrapper>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
