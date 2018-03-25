import React from 'react';
import PropTypes from 'prop-types';

import TeamLink from 'components/TeamLink';

import './FixtureTeam.scss';

const FixtureTeam = ({
  id,
  name,
  type,
  score,
  scoreStyle,
}) => (
  <span className={`FixtureTeam FixtureTeam--type--${type}`}>
    {type === 'away' && (
      <span
        className="FixtureTeam__score"
        style={scoreStyle}
      >
        {score}
      </span>
    )}

    <TeamLink
      className="FixtureTeam__link"
      id={id}
      name={name}
    >
      {name}
    </TeamLink>

    {type === 'home' && (
      <span
        className="FixtureTeam__score"
        style={scoreStyle}
      >
        {score}
      </span>
    )}
  </span>
);

FixtureTeam.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'home',
    'away',
  ]).isRequired,
  score: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  scoreStyle: PropTypes.shape({
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
};

FixtureTeam.defaultProps = {
  score: null,
  scoreStyle: null,
};

export default FixtureTeam;
