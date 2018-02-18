import React from 'react';
import PropTypes from 'prop-types';

import './FixturesCompetitionFilter.scss';

const FixturesCompetitionFilter = ({
  className,
  label,
  competitions,
  value,
  onChange,
}) => (
  <div className={`FixturesCompetitionFilter ${className}`}>
    {label && (
      <span className="FixturesCompetitionFilter__label">
        {label}
      </span>
    )}

    <select
      className="FixturesCompetitionFilter__field"
      value={value}
      onChange={onChange}
    >
      <option value="">All</option>

      {competitions.map(item => (
        <option
          value={item.id}
          key={item.id}
        >
          {item.caption}
        </option>
      ))}
    </select>
  </div>
);

FixturesCompetitionFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
};

FixturesCompetitionFilter.defaultProps = {
  className: '',
  label: null,
};

export default FixturesCompetitionFilter;
