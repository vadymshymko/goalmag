import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
          awayTeamId={item.awayTeam.id}
          awayTeamName={item.awayTeam.name}
          homeTeamId={item.homeTeam.id}
          homeTeamName={item.homeTeam.name}
          goalsAwayTeam={item.score.fullTime.awayTeam}
          goalsHomeTeam={item.score.fullTime.homeTeam}
          status={(item.status || '').toLowerCase()}
          date={moment.utc(item.utcDate).local().format('HH:mm')}
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
