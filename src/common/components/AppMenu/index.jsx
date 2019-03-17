import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppNavContainer from 'containers/AppNavContainer';
import AppInfo from 'components/AppInfo';

import styles from './AppMenu.scss';

class AppMenu extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onRequestHide: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { location, isVisible, onRequestHide } = this.props;
    const { location: prevLocation } = prevProps;

    if (location.pathname !== prevLocation.pathname && isVisible) {
      onRequestHide();
    }
  }

  render() {
    const { isVisible, location, onRequestHide } = this.props;

    return (
      <div className={`${styles.AppMenu} ${isVisible ? styles['AppMenu--visible'] : ''}`}>
        <div className={styles.AppMenu__content}>
          <AppNavContainer activeCompetition={location.pathname} />

          <AppInfo />
        </div>

        <div
          className={styles.AppMenu__bg}
          role="presentation"
          onClick={onRequestHide}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AppMenu));
