import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCompetitionsItems } from 'selectors';

import AppNav from 'components/AppNav';

const mapStateToProps = state => ({
  competitionsItems: getCompetitionsItems(state),
});

export default withRouter(connect(mapStateToProps)(AppNav));
