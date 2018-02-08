import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchTeam } from 'actions';
import { getTeamState } from 'selectors';

import { getURLLastPath } from 'utils';

import './FixtureTeam.scss';

class FixtureTeam extends Component {
  static propTypes = {
    fetchTeam: PropTypes.func.isRequired,
    crestUrl: PropTypes.string,
    link: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf([
      'home',
      'away',
    ]).isRequired,
  }

  static defaultProps = {
    crestUrl: '',
    link: '',
    name: '',
  }

  componentDidMount() {
    const teamId = parseInt(getURLLastPath(this.props.link), 10);

    this.props.fetchTeam(teamId);
  }

  render() {
    const {
      name,
      crestUrl,
      type,
    } = this.props;

    return (
      <span className={`FixtureTeam FixtureTeam--type--${type}`}>
        {crestUrl && (
          <img
            className="FixtureTeam__icon"
            src={crestUrl}
            alt={name}
          />
        )}

        <span className="FixtureTeam__name">{name}</span>
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const teamState = getTeamState(parseInt(getURLLastPath(ownProps.link), 10), state) || {};

  return teamState.info || {};
};

const actions = {
  fetchTeam,
};

export default connect(mapStateToProps, actions)(FixtureTeam);
