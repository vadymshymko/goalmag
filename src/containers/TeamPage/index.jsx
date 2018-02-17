import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTeam } from 'selectors';
import { fetchTeam } from 'actions';

import AppPage from 'components/AppPage';

class TeamPage extends Component {
  static propTypes = {
    fetchTeam: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    teamInfo: PropTypes.shape({
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    teamInfo: {},
  }

  componentDidMount() {
    this.props.fetchTeam(this.props.id);
  }

  render() {
    const {
      teamInfo: {
        name: teamName,
      },
    } = this.props;

    return (
      <AppPage title={teamName} />
    );
  }
}

const mapStateToProps = (state, {
  match: {
    params: {
      id,
    },
  },
}) => ({
  id: parseInt(id, 10),
  teamInfo: getTeam(state, id),
});

const actions = {
  fetchTeam,
};

export default connect(mapStateToProps, actions)(TeamPage);
