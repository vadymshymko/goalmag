import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './Container.scss';

const Container = ({
  children,
}) => (
  <div className={styles.Container}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export default withStyles(styles)(Container);
