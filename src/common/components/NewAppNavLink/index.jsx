import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './AppNavLink.scss';

const AppNavLink = ({ name, url, emblemUrl }) => (
  <NavLink
    className={styles.AppNavLink}
    activeClassName={styles['AppNavLink--active']}
    to={url}
    exact
    title={name}
    key={url}
  >
    <span className={styles.AppNavLink__icon}>
      <img src={emblemUrl} alt={name} />
    </span>

    <span className={styles.AppNavLink__label}>{name}</span>
  </NavLink>
);

AppNavLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  emblemUrl: PropTypes.string,
};

AppNavLink.defaultProps = {
  emblemUrl: null,
};

export default withStyles(styles)(AppNavLink);
