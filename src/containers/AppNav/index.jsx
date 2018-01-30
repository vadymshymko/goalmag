import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCompetitions } from 'actions';
import {
  getNationalTeamsCompetitions,
  getClubsCompetitions,
} from 'selectors';

class AppNav extends Component {
  static propTypes = {
    competitions: PropTypes.shape({
      national: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        caption: PropTypes.string,
      })),
      club: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        caption: PropTypes.string,
      })),
    }),
    getCompetitions: PropTypes.func,
  }

  static defaultProps = {
    competitions: {},
    getCompetitions: () => {},
  }

  componentDidMount() {
    this.props.getCompetitions();
  }

  render() {
    const { competitions } = this.props;

    return (
      <nav className="AppNav">
        <ul className="AppNav__list">
          <li className="AppNav__item">
            <Link
              className="AppNav__link"
              activeClassName="AppNav__link"
              to="/live"
              href="live"
              title="Live"
            >
              Live!
            </Link>
          </li>

          {Object.keys(competitions).map(competitionsType => (
            <li className="AppNav__item">
              <span className="AppNav__toggle">{competitionsType}</span>

              <ul className="AppNav__list AppNav__list--type--sub">
                {competitions[competitionsType].map(item => (
                  <li
                    className="AppNav__subitem"
                    key={item.id}
                  >
                    {item.caption}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  competitions: {
    national: getNationalTeamsCompetitions(state.competitions.items),
    club: getClubsCompetitions(state.competitions.items),
  },
});

const actions = {
  getCompetitions,
};

export default connect(mapStateToProps, actions)(AppNav);
