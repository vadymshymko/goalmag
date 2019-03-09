import { connect } from 'react-redux';

import {
  getTeamName,
  getTeamLogoURL,
  getTeamPlayers,
  getTeamCoach,
} from 'selectors';

import TeamPage from 'components/TeamPage';


const mapStateToProps = (state, { match: { params: { id } } }) => ({
  id,
  name: getTeamName(state, id),
  logoURL: getTeamLogoURL(state, id),
  players: getTeamPlayers(state, id),
  coach: getTeamCoach(state, id),
});

const TeamPageContainer = connect(mapStateToProps)(TeamPage);

export default TeamPageContainer;
