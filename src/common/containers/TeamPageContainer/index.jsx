import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchTeam } from 'actions';

import {
  getTeamName,
  getTeamLogoURL,
  getTeamPlayers,
  getTeamCoach,
} from 'selectors';

import TeamPage from 'components/TeamPage';

class TeamPageContainer extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    logoURL: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.object),
    coach: PropTypes.shape({
      name: PropTypes.string,
    }),
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    name: '',
    logoURL: null,
    players: [],
    coach: {},
  }

  static fetchData(dispatch, pathParams = {}) {
    const {
      id,
    } = pathParams;

    return dispatch(fetchTeam(id));
  }

  componentDidMount() {
    const {
      dispatch,
      id,
    } = this.props;

    TeamPageContainer.fetchData(dispatch, { id });
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      dispatch,
    } = this.props;
    const { id: prevId } = prevProps;

    if (id !== prevId) {
      TeamPageContainer.fetchData(dispatch, { id });
    }
  }

  render() {
    const {
      name,
      logoURL,
      players,
      coach: {
        name: coachName,
      },
    } = this.props;

    return (
      <TeamPage
        name={name}
        logoURL={logoURL}
        players={players}
        coachName={coachName}
      />
    );
  }
}


const mapStateToProps = (state, { match: { params: { id } } }) => ({
  id,
  name: getTeamName(state, id),
  logoURL: getTeamLogoURL(state, id),
  players: getTeamPlayers(state, id),
  coach: getTeamCoach(state, id),
});

export default connect(mapStateToProps)(TeamPageContainer);
