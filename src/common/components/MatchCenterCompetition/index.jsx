import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import FixturesList from 'components/FixturesList';

import styles from './MatchCenterCompetition.scss';

const MatchCenterCompetition = ({
  id,
  name,
  fixtures,
}) => (
  <article className={styles.MatchCenterCompetition}>
    <h3 className={styles.MatchCenterCompetition__title}>
      <Link
        className={styles.MatchCenterCompetition__link}
        href={`/competition/${id}`}
        to={`/competition/${id}`}
        title={name}
      >
        {name}
      </Link>
    </h3>

    <FixturesList fixtures={fixtures} />
  </article>
);

MatchCenterCompetition.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  fixtures: PropTypes.arrayOf(PropTypes.object),
};

MatchCenterCompetition.defaultProps = {
  fixtures: [],
};

export default withStyles(styles)(MatchCenterCompetition);
