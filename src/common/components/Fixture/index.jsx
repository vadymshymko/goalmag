import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import FixtureTeam from 'components/FixtureTeam';

import styles from './Fixture.scss';

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
  homeTeamId,
  homeTeamName,
  homeTeamScore,
  awayTeamId,
  awayTeamName,
  awayTeamScore,
  status,
  date,
}) => (
  <article className={styles.Fixture}>
    <span className={styles.Fixture__date}>
      {date}
    </span>

    <div className={styles.Fixture__mainInfo}>
      <FixtureTeam
        id={homeTeamId}
        name={homeTeamName}
        type="home"
        score={(status === 'in_play' || status === 'finished')
          ? homeTeamScore || 0
          : homeTeamScore || '-'
        }
        scoreStyle={{
          color: getScoreColorByStatus(status),
          backgroundColor: getScoreBgColorByStatus(status),
        }}
      />

      <span className={styles.Fixture__separator} />

      <FixtureTeam
        id={awayTeamId}
        name={awayTeamName}
        type="away"
        score={(status === 'in_play' || status === 'finished')
          ? awayTeamScore || 0
          : awayTeamScore || '-'
        }
        scoreStyle={{
          color: getScoreColorByStatus(status),
          backgroundColor: getScoreBgColorByStatus(status),
        }}
      />
    </div>

    <span className={styles.Fixture__status}>
      {status}
    </span>
  </article>
);

Fixture.propTypes = {
  homeTeamId: PropTypes.number,
  homeTeamName: PropTypes.string,
  homeTeamScore: PropTypes.number,
  awayTeamId: PropTypes.number,
  awayTeamName: PropTypes.string,
  awayTeamScore: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
};

Fixture.defaultProps = {
  homeTeamId: null,
  homeTeamName: '',
  homeTeamScore: null,
  awayTeamId: null,
  awayTeamName: '',
  awayTeamScore: null,
  status: 'timed',
  date: '',
};

export default withStyles(styles)(Fixture);
