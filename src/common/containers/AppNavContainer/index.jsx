import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCompetitions } from 'actions';
import { getCompetitionsItems } from 'selectors';

import AppNav from 'components/AppNav';

const mapStateToProps = state => ({
  competitionsItems: getCompetitionsItems(state),
});

const actions = {
  fetchCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(AppNav));
