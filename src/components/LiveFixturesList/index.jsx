import React from 'react';
import PropTypes from 'prop-types';

import LiveFixturesCompetition from 'components/LiveFixturesCompetition';

import './LiveFixturesList.scss';

const LiveFixturesList = ({
  fixturesItems,
}) => (
  <ul className="LiveFixturesList">
    {Object.keys(fixturesItems).map(key => (
      <li
        className="LiveFixturesList__item"
        key={key}
      >
        <LiveFixturesCompetition
          title={key}
          fixturesItems={fixturesItems[key]}
        />
      </li>
    ))}
  </ul>
);

LiveFixturesList.propTypes = {
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

LiveFixturesList.defaultProps = {
  fixturesItems: {},
};

export default LiveFixturesList;
