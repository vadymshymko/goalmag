import React from 'react';
import PropTypes from 'prop-types';

import './DateInput.scss';

const DateInput = ({
  fieldId,
  className,
  label,
  value,
  onChange,
}) => (
  <label
    className={`DateInput ${className}`}
    htmlFor={fieldId}
  >
    {label && (
      <span className="DateInput__label">{label}</span>
    )}

    <input
      className="DateInput__field"
      type="date"
      value={value}
      onChange={onChange}
    />
  </label>
);

DateInput.propTypes = {
  fieldId: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
};

DateInput.defaultProps = {
  className: '',
  label: null,
  fieldId: null,
};

export default DateInput;
