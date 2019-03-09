import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppNavContainer from 'containers/AppNavContainer';
import AppInfo from 'components/AppInfo';

import styles from './AppSidebar.scss';

const AppSidebar = ({ isVisible, onRequestHide }) => (
  <div className={styles.AppSidebar}>
    <div className={`${styles.AppSidebar__content} ${isVisible ? styles['AppSidebar__content--visible'] : ''}`}>
      <button
        className={styles.AppSidebar__hideBtn}
        type="button"
        onClick={onRequestHide}
        title="Hide Navigation"
        aria-label="Hide Navigation"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          className={styles.AppSidebar__hideIcon}
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

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
