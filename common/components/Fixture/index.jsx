import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import FixtureTeam from 'components/FixtureTeam';

import './Fixture.scss';

const getScoreColorByStatus = (status = '') => {
  if (status === 'finished' || status === 'in_play') {
    return 'white';
  }

  return null;
};

const getScoreBgColorByStatus = (status = '') => {
  if (status === 'finished') {
    return '#dc3545';
  } else if (status === 'in_play') {
    return '#28a745';
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
      {moment(date).format('HH:mm')}
    </span>

    <div className="Fixture__mainInfo">
      <FixtureTeam
        id={homeTeamId}
        name={homeTeamName}
        type="home"
        score={(status === 'in_play' || status === 'finished')
          ? goalsHomeTeam || 0
          : goalsHomeTeam || '-'
        }
        scoreStyle={{
          color: getScoreColorByStatus(status),
          backgroundColor: getScoreBgColorByStatus(status),
        }}
      />

      <span className="Fixture__separator" />

      <FixtureTeam
        id={awayTeamId}
        name={awayTeamName}
        type="away"
        score={(status === 'in_play' || status === 'finished')
          ? goalsAwayTeam || 0
          : goalsAwayTeam || '-'
        }
        scoreStyle={{
          color: getScoreColorByStatus(status),
          backgroundColor: getScoreBgColorByStatus(status),
        }}
      />
    </div>

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
