import React, { memo } from 'react';
import PropTypes from 'prop-types';

import * as icons from 'assets/icons';

const spriteFilename = `${process.env.APP_CLIENT_BUILD_PUBLIC_PATH}sprite.${process.env.APP_VERSION}.svg`;

/* eslint-disable react/jsx-props-no-spreading */
const Icon = memo(({ name, ...props }) => {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return (
    <svg viewBox={icon.viewBox} {...props}>
      <use xlinkHref={`${spriteFilename}#${icon.id}`} />
    </svg>
  );
});

/* eslint-enable react/jsx-props-no-spreading */

Icon.propTypes = {
  name: PropTypes.string,
};

Icon.defaultProps = {
  name: '',
};

export default Icon;
