import React, { memo } from 'react';
// import PropTypes, { string } from 'prop-types';

import AppNavItem from 'components/AppNavItem';

import { Wrapper, Title, ItemsList } from './styles';

interface Props {
  name: string;
  items: {
    href: string;
    name: string;
  }[];
}

function AppNavSection({ name = '', items }: Props) {
  return (
    <Wrapper>
      {!!name && <Title>{name}</Title>}

      <ItemsList>
        {items.map((item) => (
          <AppNavItem href={item.href} name={item.name} key={item.href} />
        ))}
      </ItemsList>
    </Wrapper>
  );
}

// AppNavSection.propTypes = {
//   name: PropTypes.string,
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       href: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// AppNavSection.defaultProps = {
//   name: null,
// };

export default memo(AppNavSection);
