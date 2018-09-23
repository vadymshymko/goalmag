import { connect } from 'react-redux';

import { fetchTeam } from 'actions';

import {
  getTeamName,
  getTeamLogoURL,
  getTeamPlayers,
  getTeamCoach,
} from 'selectors';

import TeamPage from 'components/TeamPage';

const mapStateToProps = (state, props) => {
  const id = parseInt(props.match.params.id, 10);

  return {
    id: parseInt(id, 10),
    name: getTeamName(state, id),
    logoURL: getTeamLogoURL(state, id),
    players: getTeamPlayers(state, id),
    coach: getTeamCoach(state, id),
  };
};

const actions = {
  fetchTeam,
};

export default connect(mapStateToProps, actions)(TeamPage);
