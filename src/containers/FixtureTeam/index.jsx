import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTeam } from 'actions';
import { getTeamState } from 'selectors';

import './FixtureTeam.scss';

const getTeamIdByTeamLink = (link = '') => {
  if (!link) {
    return null;
  }

  return link.substr(link.lastIndexOf('/') + 1);
};

class FixtureTeam extends Component {
  static propTypes = {
    crestUrl: PropTypes.string,
    getTeam: PropTypes.func.isRequired,
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
    const teamId = getTeamIdByTeamLink(this.props.link);

    // this.props.getTeam(teamId);
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
  const teamState = getTeamState(getTeamIdByTeamLink(ownProps.link), state.teams) || {};

  return teamState.info || {};
};

const actions = {
  getTeam,
};

export default connect(mapStateToProps, actions)(FixtureTeam);
