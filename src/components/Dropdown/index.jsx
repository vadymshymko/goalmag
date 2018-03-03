import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

const Dropdown = ({
  className,
  label,
  options,
  value,
  onChange,
}) => (
  <div className={`Dropdown ${className}`}>
    {label && (
      <span className="Dropdown__label">
        {label}
      </span>
    )}

    <select
      className="Dropdown__field"
      value={value}
      onChange={onChange}
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
  </div>
);

Dropdown.propTypes = {
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
    label: PropTypes.string,
  })),
  className: PropTypes.string,
  label: PropTypes.node,
};

Dropdown.defaultProps = {
  className: '',
  label: null,
  options: [],
  value: null,
};

export default Dropdown;
