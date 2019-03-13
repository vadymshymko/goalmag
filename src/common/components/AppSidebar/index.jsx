import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppNavContainer from 'containers/AppNavContainer';
import AppInfo from 'components/AppInfo';

import styles from './AppSidebar.scss';

const AppSidebar = ({ isVisible, onRequestHide }) => (
  <div className={styles.AppSidebar}>
    <div className={`${styles.AppSidebar__content} ${isVisible ? styles['AppSidebar__content--visible'] : ''}`}>
      <AppNavContainer isVisible={isVisible} onRequestHide={onRequestHide} />

      <AppInfo />
    </div>

    <div
      className={styles.AppSidebar__bg}
      role="presentation"
      onClick={onRequestHide}
    />
  </div>
);

AppSidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onRequestHide: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppSidebar);
