import React from 'react';
import PropTypes from 'prop-types';

import './FixtureTeam.scss';

const FixtureTeam = ({
  name,
  type,
}) => (
  <span className={`FixtureTeam FixtureTeam--type--${type}`}>
    <span className="FixtureTeam__name">
      {name}
    </span>
  </span>
);

FixtureTeam.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'home',
    'away',
  ]).isRequired,
};

export default FixtureTeam;
