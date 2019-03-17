import { connect } from 'react-redux';

import { getCompetitionsItems } from 'selectors';

import AppNav from 'components/AppNav';

const mapStateToProps = state => ({
  competitionsItems: getCompetitionsItems(state),
});

export default connect(mapStateToProps)(AppNav);
