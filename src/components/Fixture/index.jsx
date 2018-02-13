import React from 'react';
import PropTypes from 'prop-types';

import FixtureTeam from 'components/FixtureTeam';

import { getFormattedDatetimeByDatetime } from 'utils';

import './Fixture.scss';

const getFixtureScoreColorByStatus = (status = '') => {
  if (status === 'finished' || status === 'in_play') {
    return 'white';
  }

  return null;
};

const getFixtureScoreBgColorByStatus = (status = '') => {
  if (status === 'finished') {
    return 'red';
  } else if (status === 'in_play') {
    return 'green';
  }

  return null;
};

const Fixture = ({
  awayTeamId,
  awayTeamName,
  date,
  goalsAwayTeam,
  goalsHomeTeam,
  homeTeamId,
  homeTeamName,
  status,
}) => (
  <article className="Fixture">
    <span className="Fixture__date">
      {getFormattedDatetimeByDatetime(date)}
    </span>

    <span className="Fixture__main-info">
      <FixtureTeam
        id={homeTeamId}
        name={homeTeamName}
        type="home"
      />

      <strong className="Fixture__score FixtureScore">
        <span
          className="FixtureScore__goals-count"
          style={{
            backgroundColor: getFixtureScoreBgColorByStatus(status),
            color: getFixtureScoreColorByStatus(status),
          }}
        >
          {(status === 'in_play' || status === 'finished')
            ? goalsHomeTeam || 0
            : goalsHomeTeam || '-'
          }
        </span>

        <span className="FixtureScore__separator">:</span>

        <span
          className="FixtureScore__goals-count"
          style={{
            backgroundColor: getFixtureScoreBgColorByStatus(status),
            color: getFixtureScoreColorByStatus(status),
          }}
        >
          {(status === 'in_play' || status === 'finished')
            ? goalsAwayTeam || 0
            : goalsAwayTeam || '-'
          }
        </span>
      </strong>

      <FixtureTeam
        id={awayTeamId}
        name={awayTeamName}
        type="away"
      />
    </span>

    <span className="Fixture__status">
      {status}
    </span>
  </article>
);

Fixture.propTypes = {
  awayTeamId: PropTypes.number,
  awayTeamName: PropTypes.string,
  date: PropTypes.string,
  goalsAwayTeam: PropTypes.number,
  goalsHomeTeam: PropTypes.number,
  homeTeamId: PropTypes.number,
  homeTeamName: PropTypes.string,
  status: PropTypes.oneOf([
    'timed',
    'in_play',
    'finished',
    'postponed',
    'scheduled',
  ]),
};

Fixture.defaultProps = {
  awayTeamId: null,
  awayTeamName: '',
  homeTeamId: null,
  homeTeamName: '',
  goalsAwayTeam: null,
  goalsHomeTeam: null,
  date: '',
  status: 'timed',
};

export default Fixture;
