import React from 'react';
import PropTypes from 'prop-types';

import MatchCenterCompetition from 'components/MatchCenterCompetition';

import './MatchCenterList.scss';

const MatchCenterList = ({
  fixturesItems,
}) => (
  <ul className="MatchCenterList">
    {Object.keys(fixturesItems).map(key => (
      <li
        className="MatchCenterList__item"
        key={key}
      >
        <MatchCenterCompetition
          title={key}
          fixturesItems={fixturesItems[key]}
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
