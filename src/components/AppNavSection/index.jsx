import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Icon from 'components/Icon';

import './AppNavSection.scss';

export default class AppNavSection extends Component {
  static propTypes = {
    title: PropTypes.node,
    links: PropTypes.arrayOf(PropTypes.object),
    isActive: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    title: null,
    links: [],
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
      title,
      links,
    } = this.props;

    return (
      <div className="AppNavSection">
        {title && (
          <div className="AppNavSection__header">
            <button
              className="AppNavSection__contentToggle"
              type="button"
              onClick={this.toggleContent}
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

            {links[0] ? (
              <NavLink
                className="AppNavSection__title"
                to={links[0].to}
                exact
                title={links[0].title}
              >
                {title}
              </NavLink>
            ) : (
              <span className="AppNavSection__title">{title}</span>
            )}
          </div>
        )}

        {(this.state.showContent || !title) && (
          <div className="AppNavSection__content">
            <ul className="AppNavSection__list">
              {links.map(link => (
                <li
                  className="AppNavSection__item"
                  key={link.to}
                >
                  <NavLink
                    className="AppNavSection__link"
                    activeClassName="AppNavSection__link--active"
                    to={link.to}
                    exact
                    title={link.title}
                  >
                    {link.title}
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
