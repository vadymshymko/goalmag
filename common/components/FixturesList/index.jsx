import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Fixture from 'components/Fixture';

import './FixturesList.scss';

const FixturesList = ({
  fixtures,
}) => (
  <ul className="FixturesList">
    {fixtures.map(({
      id,
      homeTeam: {
        id: homeTeamId,
        name: homeTeamName,
      } = {},
      awayTeam: {
        id: awayTeamId,
        name: awayTeamName,
      } = {},
      score: {
        fullTime: {
          awayTeam: awayTeamScore,
          homeTeam: homeTeamScore,
        } = {},
      } = {},
      status = '',
      utcDate = Date.now(),
    } = {}) => (
      <li
        className="FixturesList__item"
        key={id}
      >
        <Fixture
          homeTeamId={homeTeamId}
          homeTeamName={homeTeamName}
          homeTeamScore={homeTeamScore}
          awayTeamId={awayTeamId}
          awayTeamName={awayTeamName}
          awayTeamScore={awayTeamScore}
          status={status.toLowerCase()}
          date={moment.utc(utcDate).local().format('HH:mm')}
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
