import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import { fetchFixtures } from 'actions';

import {
  getCompetitions,
  getFixtures,
  getIsFixturesFetching,
  getIsFixturesInitialized,
} from 'selectors';

import MatchCenterPage from 'components/MatchCenterPage';

const mapStateToProps = (state, {
  location: {
    search,
  },
}) => {
  const {
    competitionId,
    date,
  } = parse(search);

  const searchParams = {
    competitionId: parseInt(competitionId || 0, 10),
    date: moment(date || Date.now()).format('YYYY-MM-DD'),
  };

  const competitions = getCompetitions(state);
  const fixtures = getFixtures(state, { ...searchParams });
  const isFixturesFetching = getIsFixturesFetching(state);
  const isFixturesInitialized = getIsFixturesInitialized(state);

  return {
    searchParams,
    fixtures,
    isFixturesFetching,
    isFixturesInitialized,
    competitions,
  };
};

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
