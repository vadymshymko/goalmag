import React from 'react';
import PropTypes from 'prop-types';

import Fixture from 'components/Fixture';

import './FixturesList.scss';

const FixturesList = ({
  fixturesItems,
}) => (
  <ul className="FixturesList">
    {fixturesItems.map(item => (
      <li
        className="FixturesList__item"
        key={item.links.self.href}
      >
        <Fixture
          awayTeamLink={item.links.awayTeam.href}
          awayTeamName={item.awayTeamName}
          date={item.date}
          goalsAwayTeam={item.result.goalsAwayTeam}
          goalsHomeTeam={item.result.goalsHomeTeam}
          homeTeamLink={item.links.homeTeam.href}
          homeTeamName={item.homeTeamName}
          status={(item.status || '').toLowerCase()}
        />
      </li>
    ))}
  </ul>
);

FixturesList.propTypes = {
  fixturesItems: PropTypes.arrayOf(PropTypes.object),
};

FixturesList.defaultProps = {
  fixturesItems: [],
};

export default FixturesList;
