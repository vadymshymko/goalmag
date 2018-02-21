import React from 'react';
import PropTypes from 'prop-types';

import './FixturesDateFilter.scss';

const FixturesDateFilter = ({
  className,
  label,
  value,
  onChange,
}) => (
  <div className={`FixturesDateFilter ${className}`}>
    {label && (
      <span className="FixturesDateFilter__label">{label}</span>
    )}

    <input
      className="FixturesDateFilter__field"
      type="date"
      value={value}
      onChange={onChange}
    />
  </div>
);

FixturesDateFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
};

FixturesDateFilter.defaultProps = {
  className: '',
  label: null,
};

export default FixturesDateFilter;
