import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

const Dropdown = ({
  fieldId,
  className,
  label,
  options,
  value,
  onChange,
}) => (
  <label
    className={`Dropdown ${className}`}
    htmlFor={fieldId}
  >
    {label && (
      <span className="Dropdown__label">
        {label}
      </span>
    )}

    <select
      className="Dropdown__field"
      value={value}
      onChange={onChange}
      id={fieldId}
    >
      {options.map(option => (
        <option
          value={option.value}
          key={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

Dropdown.propTypes = {
  fieldId: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  className: PropTypes.string,
  label: PropTypes.node,
};

Dropdown.defaultProps = {
  fieldId: null,
  className: '',
  label: null,
  options: [],
  value: null,
};

export default Dropdown;
