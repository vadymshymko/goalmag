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
          competitionName={competition.caption}
          competitionId={competition.id}
        />
      </li>
    ))}
  </ul>
);

MatchCenterCompetitionsList.propTypes = {
  competitions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    caption: PropTypes.string,
  })),
};

MatchCenterCompetitionsList.defaultProps = {
  competitions: [],
};

export default MatchCenterCompetitionsList;
