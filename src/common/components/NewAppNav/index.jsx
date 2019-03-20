import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppNavLink from 'components/AppNavLink';

import styles from './AppNav.scss';

const AppNav = ({ competitionsItems }) => (
  <nav className={styles.AppNav}>
    <AppNavLink
      name="Match Center"
      url="/"
    />

    {competitionsItems.map(item => (
      <AppNavLink
        name={item.name}
        url={`/competition/${item.id}`}
        emblemUrl={item.emblemUrl}
      />
    ))}
  </nav>
);


AppNav.propTypes = {
  competitionsItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(AppNav);
