import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCompetitions } from 'actions';
import { getCompetitions } from 'selectors';

import AppNav from 'components/AppNav';

const mapStateToProps = state => ({
  competitions: getCompetitions(state),
});

const actions = {
  fetchCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(AppNav));
