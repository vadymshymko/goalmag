import React from 'react';
import PropTypes from 'prop-types';

import MatchCenterCompetition from 'components/MatchCenterCompetition';

import './MatchCenterList.scss';

const MatchCenterList = ({
  fixturesItems,
}) => (
  <ul className="MatchCenterList">
    {Object.keys(fixturesItems).map(competitionId => (
      <li
        className="MatchCenterList__item"
        key={competitionId}
      >
        <MatchCenterCompetition
          competitionId={competitionId}
          fixturesItems={fixturesItems[competitionId]}
        />
      </li>
    ))}
  </ul>
);

MatchCenterList.propTypes = {
  fixturesItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    awayTeamName: PropTypes.string,
    homeTeamName: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string,
    result: PropTypes.shape({
      goalsAwayTeam: PropTypes.number,
      goalsHomeTeam: PropTypes.number,
    }),
  }))),
};

MatchCenterList.defaultProps = {
  fixturesItems: {},
};

export default MatchCenterList;
