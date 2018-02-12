import React from 'react';
import PropTypes from 'prop-types';

import MatchCenterCompetition from 'containers/MatchCenterCompetition';

import './MatchCenterCompetitionsList.scss';

const MatchCenterCompetitionsList = ({
  competitions,
}) => (
  <ul className="MatchCenterCompetitionsList">
    {competitions.map(competition => (
      <li
        className="MatchCenterCompetitionsList__item"
        key={competition.id}
      >
        <MatchCenterCompetition
          competition={competition}
        />
      </li>
    ))}
  </ul>
);

MatchCenterCompetitionsList.propTypes = {
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MatchCenterCompetitionsList;
