import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Icon from 'components/Icon';

import './AppNavSection.scss';

export default class AppNavSection extends Component {
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
      <div className="AppNavSection">
        {name && (
          <div className="AppNavSection__header">
            <button
              className="AppNavSection__contentToggle"
              type="button"
              onClick={this.toggleContent}
              title={`Show ${name} competitions navigation`}
              aria-label={`Show ${name} competitions navigation`}
            >
              <Icon
                className="AppNavSection__contentToggleIcon"
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
                className="AppNavSection__title"
                to={competitions[0].url}
                exact
                title={competitions[0].name}
              >
                {name}
              </NavLink>
            ) : (
              <span className="AppNavSection__title">{name}</span>
            )}
          </div>
        )}

        {competitions.length > 0 && (
          <div
            className={`
              AppNavSection__content
              ${this.state.showContent || !name
                ? 'AppNavSection__content--visible'
                : ''
              }
            `}
          >
            <ul className="AppNavSection__list">
              {competitions.map(competition => (
                <li
                  className="AppNavSection__item"
                  key={competition.id}
                >
                  <NavLink
                    className="AppNavSection__link"
                    activeClassName="AppNavSection__link--active"
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
