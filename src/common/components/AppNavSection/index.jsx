import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './AppNavSection.scss';

const AppNavSection = ({
  name,
  competitions,
}) => (
  <div className={styles.AppNavSection}>
    {name && (
      <span className={styles.AppNavSection__title}>
        {name}:
      </span>
    )}

    {competitions.length > 0 && (
      <div className={styles.AppNavSection__content}>
        {competitions.map(competition => (
          <NavLink
            className={styles.AppNavSection__link}
            activeClassName={styles['AppNavSection__link--active']}
            to={competition.url}
            exact
            title={competition.name}
            key={competition.url}
          >
            {competition.name}
          </NavLink>
        ))}
      </div>
    )}
  </div>
);

AppNavSection.propTypes = {
  name: PropTypes.node,
  competitions: PropTypes.arrayOf(PropTypes.object),
};

AppNavSection.defaultProps = {
  name: null,
  competitions: [],
};

export default withStyles(styles)(AppNavSection);
