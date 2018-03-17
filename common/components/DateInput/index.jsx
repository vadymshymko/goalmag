import React from 'react';
import PropTypes from 'prop-types';

import './DateInput.scss';

const DateInput = ({
  className,
  label,
  value,
  onChange,
}) => (
  <div className={`DateInput ${className}`}>
    {label && (
      <span className="DateInput__label">{label}</span>
    )}

    <input
      className="DateInput__field"
      type="date"
      value={value}
      onChange={onChange}
    />
  </div>
);

DateInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
};

DateInput.defaultProps = {
  className: '',
  label: null,
};

export default DateInput;
