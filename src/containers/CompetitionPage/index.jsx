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
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  competitionInfo: getCompetitionInfo(ownProps.match.params.id, state),
});

export default connect(mapStateToProps)(CompetitionPage);
