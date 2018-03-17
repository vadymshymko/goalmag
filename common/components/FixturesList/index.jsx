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
        key={item.id}
      >
        <Fixture
          awayTeamId={item.awayTeamId}
          awayTeamName={item.awayTeamName}
          homeTeamId={item.homeTeamId}
          homeTeamName={item.homeTeamName}
          goalsAwayTeam={item.result.goalsAwayTeam}
          goalsHomeTeam={item.result.goalsHomeTeam}
          status={(item.status || '').toLowerCase()}
          date={item.date}
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
