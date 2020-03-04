import React from 'react';
import PropTypes from 'prop-types';

import AppNavLink from 'components/AppNavLink';

import Wrapper from './styles';

function AppNavItem({ href, name }) {
  return (
    <Wrapper>
      <AppNavLink to={href} href={href} title={name}>
        {name}
      </AppNavLink>
    </Wrapper>
  );
}

AppNavItem.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default AppNavItem;
