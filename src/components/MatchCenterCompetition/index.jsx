import React from 'react';
import PropTypes from 'prop-types';

import FixturesList from 'components/FixturesList';

import './MatchCenterCompetition.scss';

const MatchCenterCompetition = ({
  competitionFixtures,
  competitionName,
}) => (
  <article className="MatchCenterCompetition">
    <h3 className="MatchCenterCompetition__title">
      {competitionName}
    </h3>

    <FixturesList fixtures={competitionFixtures} />
  </article>
);

MatchCenterCompetition.propTypes = {
  competitionName: PropTypes.string.isRequired,
  competitionFixtures: PropTypes.arrayOf(PropTypes.object),
};

MatchCenterCompetition.defaultProps = {
  competitionFixtures: [],
};

export default MatchCenterCompetition;
