import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';

import Icon from 'components/Icon';

import styles from './AppNavSection.scss';

class AppNavSection extends Component {
  static propTypes = {
    name: PropTypes.node,
    competitions: PropTypes.arrayOf(PropTypes.object),
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    name: null,
    competitions: [],
    isActive: false,
  }

  state = {
    showContent: this.props.isActive,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive && !this.props.isActive && !this.state.showContent) {
      this.setState(() => ({
        showContent: true,
      }));
    }
  }

  toggleContent = () => {
    this.setState(state => ({
      showContent: !state.showContent,
    }));
  }

  render() {
    const {
      name,
      competitions,
    } = this.props;

    return (
      <div className={styles.AppNavSection}>
        {name && (
          <div className={styles.AppNavSection__header}>
            <button
              className={styles.AppNavSection__contentToggle}
              type="button"
              onClick={this.toggleContent}
              title={`Show ${name} competitions navigation`}
              aria-label={`Show ${name} competitions navigation`}
            >
              <Icon
                className={styles.AppNavSection__contentToggleIcon}
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              >
                {this.state.showContent ? (
                  <polyline points="6 9 12 15 18 9" />
                ) : (
                  <polyline points="9 18 15 12 9 6" />
                )}
              </Icon>
            </button>

            {competitions[0] ? (
              <NavLink
                className={styles.AppNavSection__title}
                to={competitions[0].url}
                exact
                title={competitions[0].name}
              >
                {name}
              </NavLink>
            ) : (
              <span className={styles.AppNavSection__title}>{name}</span>
            )}
          </div>
        )}

        {competitions.length > 0 && (
          <div
            className={`
              ${styles.AppNavSection__content}
              ${this.state.showContent || !name
                ? styles['AppNavSection__content--visible']
                : ''
              }
            `}
          >
            <ul className={styles.AppNavSection__list}>
              {competitions.map(competition => (
                <li
                  className={styles.AppNavSection__item}
                  key={competition.id}
                >
                  <NavLink
                    className={styles.AppNavSection__link}
                    activeClassName={styles['AppNavSection__link--active']}
                    to={competition.url}
                    exact
                    title={competition.name}
                  >
                    {competition.name}
                  </NavLink>
                </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AppNavSection);
