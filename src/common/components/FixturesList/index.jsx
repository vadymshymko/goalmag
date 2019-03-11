import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Fixture from 'components/Fixture';

import styles from './FixturesList.scss';

const FixturesList = ({
  fixtures,
}) => (
  <ul className={styles.FixturesList}>
    {fixtures.map(({
      id,
      homeTeam: {
        id: homeTeamId,
        name: homeTeamName,
        crestUrl: homeTeamLogoUrl,
      } = {},
      awayTeam: {
        id: awayTeamId,
        name: awayTeamName,
        crestUrl: awayTeamLogoUrl,
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
        className={styles.FixturesList__item}
        key={id}
      >
        <Fixture
          homeTeamId={homeTeamId}
          homeTeamName={homeTeamName}
          homeTeamScore={homeTeamScore}
          homeTeamLogoUrl={homeTeamLogoUrl}
          awayTeamId={awayTeamId}
          awayTeamName={awayTeamName}
          awayTeamScore={awayTeamScore}
          awayTeamLogoUrl={awayTeamLogoUrl}
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

export default withStyles(styles)(FixturesList);
