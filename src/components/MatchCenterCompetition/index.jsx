import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FixturesList from 'components/FixturesList';

import './MatchCenterCompetition.scss';

const MatchCenterCompetition = ({
  competitionFixtures,
  competitionName,
  competitionId,
}) => (
  <article className="MatchCenterCompetition">
    <h3 className="MatchCenterCompetition__title">
      <Link
        className="MatchCenterCompetition__link"
        href={`/competition/${competitionId}`}
        to={`/competition/${competitionId}`}
        title={competitionName}
      >
        {competitionName}
      </Link>
    </h3>

    <FixturesList fixtures={competitionFixtures} />
  </article>
);

MatchCenterCompetition.propTypes = {
  competitionId: PropTypes.number.isRequired,
  competitionName: PropTypes.string.isRequired,
  competitionFixtures: PropTypes.arrayOf(PropTypes.object),
};

MatchCenterCompetition.defaultProps = {
  competitionFixtures: [],
};

export default MatchCenterCompetition;
