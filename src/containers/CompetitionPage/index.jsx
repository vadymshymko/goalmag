import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCompetitionInfo } from 'selectors';

const CompetitionPage = ({ competitionInfo }) => (
  <div>
    <h1>{competitionInfo.caption}</h1>
  </div>
);

CompetitionPage.propTypes = {
  competitionInfo: PropTypes.shape({
    caption: PropTypes.string,
  }),
};

CompetitionPage.defaultProps = {
  competitionInfo: {},
};

const mapStateToProps = (state, ownProps) => ({
  competitionInfo: getCompetitionInfo(state.competitions.items, ownProps.match.params.id),
});

export default connect(mapStateToProps)(CompetitionPage);
