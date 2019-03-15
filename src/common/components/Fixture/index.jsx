import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import FixtureTeam from 'components/FixtureTeam';

import styles from './Fixture.scss';

const getScoreColorByStatus = (status = '') => {
  if (status === 'finished' || status === 'in_play' || status === 'paused') {
    return '#fff';
  }

  return null;
};

const getScoreBgColorByStatus = (status = '') => {
  if (status === 'finished') {
    return '#dc3545';
  } else if (status === 'in_play') {
    return '#28a745';
  } else if (status === 'paused') {
    return '#ffc107';
  }

  return null;
};

const Fixture = ({
  homeTeamId,
  homeTeamName,
  homeTeamScore,
  homeTeamLogoUrl,
  awayTeamId,
  awayTeamName,
  awayTeamScore,
  awayTeamLogoUrl,
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
        logoUrl={homeTeamLogoUrl}
        score={(status === 'in_play' || status === 'finished' || status === 'paused')
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
        logoUrl={awayTeamLogoUrl}
        score={(status === 'in_play' || status === 'finished' || status === 'paused')
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
      {(status || '').replace(/_/gi, ' ')}
    </span>
  </article>
);

Fixture.propTypes = {
  homeTeamId: PropTypes.number,
  homeTeamName: PropTypes.string,
  homeTeamScore: PropTypes.number,
  homeTeamLogoUrl: PropTypes.string,
  awayTeamId: PropTypes.number,
  awayTeamName: PropTypes.string,
  awayTeamScore: PropTypes.number,
  awayTeamLogoUrl: PropTypes.string,
  status: PropTypes.string,
  date: PropTypes.string,
};

Fixture.defaultProps = {
  homeTeamId: null,
  homeTeamName: '',
  homeTeamScore: null,
  homeTeamLogoUrl: '',
  awayTeamId: null,
  awayTeamName: '',
  awayTeamScore: null,
  awayTeamLogoUrl: '',
  status: 'timed',
  date: '',
};

export default withStyles(styles)(Fixture);
