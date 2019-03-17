import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import FixtureTeam from 'components/FixtureTeam';

import styles from './Fixture.scss';

// SCHEDULED | LIVE | IN_PLAY | PAUSED | FINISHED | POSTPONED | SUSPENDED | CANCELED;

const getScoreStyleByStatus = (status) => {
  if (status === 'live' || status === 'in_play' || status === 'paused') {
    return {
      backgroundColor: '#28a745',
      color: '#fff',
    };
  }

  if (status === 'finished') {
    return {
      backgroundColor: '#343a40',
      color: '#fff',
    };
  }

  return {
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  };
};

const getStatusLabel = (status, startDate) => {
  if (status === 'finished') {
    return 'FT';
  }

  if (status === 'paused') {
    return 'HT';
  }

  if (status === 'scheduled') {
    return 'SCHED';
  }

  if (status === 'postponed') {
    return 'POST';
  }

  if (status === 'suspended') {
    return 'PEND';
  }

  if (status === 'canceled') {
    return 'CAN';
  }

  if (status === 'live' || status === 'in_play') {
    const currentDate = moment(Date.now()).local();
    const diff = currentDate.diff(moment(startDate).local(), 'minutes');

    if (diff <= 0) {
      return '1′';
    }

    if (diff < 45) {
      return `${diff + 1}′`;
    }

    if (diff < 60) {
      return '45′';
    }

    if (diff < 105) {
      return `${diff - 14}′`;
    }

    return '90′+';
  }

  return (status || '').replace(/_/gi, ' ').toUpperCase();
};

const getStatusStyle = (status) => {
  if (status === 'live' || status === 'in_play' || status === 'paused' || status === 'finished') {
    return {
      color: '#343a40',
    };
  }

  return {
    color: '#6c757d',
  };
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
  utcDate,
}) => (
  <article className={styles.Fixture}>
    <span className={styles.Fixture__date}>
      {moment.utc(utcDate).local().format('HH:mm')}
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
        scoreStyle={getScoreStyleByStatus(status)}
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
        scoreStyle={getScoreStyleByStatus(status)}
      />
    </div>

    <span className={styles.Fixture__status} style={getStatusStyle(status)}>
      {getStatusLabel(status, utcDate)}
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
  utcDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  utcDate: Date.now(),
};

export default withStyles(styles)(Fixture);
