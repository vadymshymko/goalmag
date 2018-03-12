import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCompetitions } from 'actions';

import {
  getCompetitionsNav,
  getIsCompetitionsInitialized,
} from 'selectors';

import App from 'components/App';

const mapStateToProps = (state, props) => {
  const locationPathname = props.location.pathname;

  return {
    locationPathname,
    showContent: getIsCompetitionsInitialized(state),
    competitionsNav: getCompetitionsNav(state, locationPathname),
  };
};

const actions = {
  fetchCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(App));
