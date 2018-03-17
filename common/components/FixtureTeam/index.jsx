import React from 'react';
import PropTypes from 'prop-types';

import TeamLink from 'components/TeamLink';

import './FixtureTeam.scss';

const FixtureTeam = ({
  id,
  name,
  type,
}) => (
  <span className={`FixtureTeam FixtureTeam--type--${type}`}>
    <TeamLink
      id={id}
      name={name}
    >
      {name}
    </TeamLink>
  </span>
);

FixtureTeam.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'home',
    'away',
  ]).isRequired,
};

export default FixtureTeam;
