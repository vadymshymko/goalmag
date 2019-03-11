import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './TeamLink.scss';

const TeamLink = ({
  id,
  name,
  children,
  className,
  logoUrl,
  renderEmptyLogo,
}) => (
  <Link
    className={`${styles.TeamLink} ${className}`}
    to={`/team/${id}`}
    href={`/team/${id}`}
    title={name}
  >
    {logoUrl && (
      <img
        className={styles.TeamLink__logo}
        src={logoUrl.replace('http://', 'https://')}
        alt={name}
        title={name}
      />
    )}
    {(!logoUrl && renderEmptyLogo) && (
      <span
        className={styles.TeamLink__logo}
      />
    )}

    {children || name}
  </Link>
);

TeamLink.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  logoUrl: PropTypes.string,
  renderEmptyLogo: PropTypes.bool,
};

TeamLink.defaultProps = {
  name: '',
  children: null,
  className: '',
  logoUrl: '',
  renderEmptyLogo: false,
};

export default withStyles(styles)(TeamLink);
