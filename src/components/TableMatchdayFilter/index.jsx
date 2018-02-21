import React from 'react';
import PropTypes from 'prop-types';

import './TableMatchdayFilter.scss';

const TableMatchdayFilter = ({
  className,
  label,
  matchdays,
  value,
  onChange,
}) => (
  <div className={`TableMatchdayFilter ${className}`}>
    {label && (
      <span className="TableMatchdayFilter__label">
        {label}
      </span>
    )}

    <select
      className="TableMatchdayFilter__field"
      value={value}
      onChange={onChange}
    >
      {matchdays.map(item => (
        <option
          value={item}
          key={item}
        >
          {item}
        </option>
      ))}
    </select>
  </div>
);

TableMatchdayFilter.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  matchdays: PropTypes.arrayOf(PropTypes.number).isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
};

TableMatchdayFilter.defaultProps = {
  className: '',
  label: null,
};

export default TableMatchdayFilter;
