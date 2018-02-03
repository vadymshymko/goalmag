import React from 'react';
import PropTypes from 'prop-types';

import { getFormattedDatetimeByDatetime } from 'utils';

import FixtureTeam from 'containers/FixtureTeam';

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
  awayTeamLink,
  awayTeamName,
  date,
  goalsAwayTeam,
  goalsHomeTeam,
  homeTeamLink,
  homeTeamName,
  status,
}) => (
  <article className="Fixture">
    <span className="Fixture__date">
      {getFormattedDatetimeByDatetime(date)}
    </span>

    <span className="Fixture__main-info">
      <FixtureTeam
        link={homeTeamLink}
        name={homeTeamName}
        type="home"
      />

      <strong
        className="Fixture__score FixtureScore"
        style={{
          color: getFixtureScoreColorByStatus(status),
        }}
      >
        <span
          className="FixtureScore__goals-count"
          style={{
            backgroundColor: getFixtureScoreBgColorByStatus(status),
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
          }}
        >
          {(status === 'in_play' || status === 'finished')
            ? goalsAwayTeam || 0
            : goalsAwayTeam || '-'
          }
        </span>
      </strong>

      <FixtureTeam
        link={awayTeamLink}
        name={awayTeamName}
        type="home"
      />
    </span>
  </article>
);

Fixture.propTypes = {
  awayTeamLink: PropTypes.string,
  awayTeamName: PropTypes.string,
  date: PropTypes.string,
  goalsAwayTeam: PropTypes.number,
  goalsHomeTeam: PropTypes.number,
  homeTeamLink: PropTypes.string,
  homeTeamName: PropTypes.string,
  status: PropTypes.oneOf([
    'timed',
    'in_play',
    'finished',
  ]),
};

Fixture.defaultProps = {
  awayTeamLink: '',
  awayTeamName: '',
  date: '',
  goalsAwayTeam: null,
  goalsHomeTeam: null,
  homeTeamLink: '',
  homeTeamName: '',
  status: 'timed',
};

export default Fixture;
