import React from 'react';
import PropTypes from 'prop-types';

import MatchCenterCompetition from 'containers/MatchCenterCompetition';

import './MatchCenterList.scss';

const MatchCenterList = ({
  competitions,
}) => (
  <ul className="MatchCenterList">
    {competitions.map(competition => (
      <li
        className="MatchCenterList__item"
        key={competition.id}
      >
        <MatchCenterCompetition
          competition={competition}
        />
      </li>
    ))}
  </ul>
);

MatchCenterList.propTypes = {
  competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MatchCenterList;
