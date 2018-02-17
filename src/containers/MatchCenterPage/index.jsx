import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPage from 'components/AppPage';
import MatchCenterCompetitionsList from 'components/MatchCenterCompetitionsList';
import Alert from 'components/Alert';

import {
  getFixturesCompetitionsIds,
  getCompetition,
  getIsFixturesFetching,
} from 'selectors';

const MatchCenterPage = ({
  fixturesCompetitions,
  isFixturesFetching,
}) => (
  <AppPage
    title="Match Center"
    className="MatchCenterPage"
  >
    {fixturesCompetitions.length > 0 && (
      <MatchCenterCompetitionsList competitions={fixturesCompetitions} />
    )}

    {!isFixturesFetching && fixturesCompetitions.length === 0 && (
      <Alert>:( There are no matches</Alert>
    )}
  </AppPage>
);

MatchCenterPage.propTypes = {
  fixturesCompetitions: PropTypes.arrayOf(PropTypes.object),
  isFixturesFetching: PropTypes.bool.isRequired,
};

MatchCenterPage.defaultProps = {
  fixturesCompetitions: [],
};

const mapStateToProps = state => ({
  fixturesCompetitions: getFixturesCompetitionsIds(state).map(competitionId => (
    getCompetition(state, competitionId)
  )),
  isFixturesFetching: getIsFixturesFetching(state),
});

export default connect(mapStateToProps)(MatchCenterPage);
