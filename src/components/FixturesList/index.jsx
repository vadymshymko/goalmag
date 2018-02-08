import React from 'react';
import PropTypes from 'prop-types';

import Fixture from 'components/Fixture';

import './FixturesList.scss';

const FixturesList = ({
  fixtures,
}) => (
  <ul className="FixturesList">
    {fixtures.map(item => (
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
  fixtures: PropTypes.arrayOf(PropTypes.object),
};

FixturesList.defaultProps = {
  fixtures: [],
};

export default FixturesList;
