import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './TeamLink.scss';

const TeamLink = ({
  id,
  name,
  children,
  className,
}) => (
  <Link
    className={`${styles.TeamLink} ${className}`}
    to={`/team/${id}`}
    href={`/team/${id}`}
    title={name}
  >
    {children || name}
  </Link>
);

TeamLink.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

TeamLink.defaultProps = {
  name: '',
  children: null,
  className: '',
};

export default withStyles(styles)(TeamLink);
