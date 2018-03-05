import { connect } from 'react-redux';

import {
  getTeam,
  getSquad,
} from 'selectors';

import {
  fetchTeam,
  fetchSquad,
} from 'actions';

import TeamPage from 'components/TeamPage';

const mapStateToProps = (state, {
  match: {
    params: {
      id,
    },
  },
}) => ({
  teamId: parseInt(id, 10),
  teamInfo: getTeam(state, id),
  teamSquad: getSquad(state, id),
});

const actions = {
  fetchTeam,
  fetchSquad,
};

export default connect(mapStateToProps, actions)(TeamPage);
