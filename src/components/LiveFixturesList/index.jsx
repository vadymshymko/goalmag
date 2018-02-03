import React from 'react';
import PropTypes from 'prop-types';

import FixturesList from 'components/FixturesList';

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
        <article className="LiveFixturesList__competition">
          <h3 className="LiveFixturesList__competition-title">{key}</h3>

          <FixturesList fixturesItems={fixturesItems[key]} />
        </article>
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
