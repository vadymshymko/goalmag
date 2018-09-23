import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FixturesList from 'components/FixturesList';

import './MatchCenterCompetition.scss';

const MatchCenterCompetition = ({
  id,
  name,
  fixtures,
}) => (
  <article className="MatchCenterCompetition">
    <h3 className="MatchCenterCompetition__title">
      <Link
        className="MatchCenterCompetition__link"
        href={`/competition/${id}`}
        to={`/competition/${id}`}
        title={name}
      >
        {name}
      </Link>
    </h3>

    <FixturesList fixtures={fixtures} />
  </article>
);

MatchCenterCompetition.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  fixtures: PropTypes.arrayOf(PropTypes.object),
};

MatchCenterCompetition.defaultProps = {
  fixtures: [],
};

export default MatchCenterCompetition;
