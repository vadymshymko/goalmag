import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styles';

function AppNavLink({ href, title, children }) {
  return (
    <Wrapper to={href} href={href} title={title}>
      {children}
    </Wrapper>
  );
}

AppNavLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppNavLink;
