import { connect } from 'react-redux';

import { getIsCompetitionsInitialized } from 'selectors';

import AppInner from 'components/AppInner';

const mapStateToProps = state => ({
  isCompetitionsInitialized: getIsCompetitionsInitialized(state),
});

export default connect(mapStateToProps)(AppInner);
