import { connect } from 'react-redux';
import { parse } from 'query-string';
import moment from 'moment';

import { fetchFixtures } from 'actions';

import {
  getCompetitions,
  getFixtures,
  getIsFixturesFetching,
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

  return {
    searchParams,
    fixtures,
    isFixturesFetching,
    competitions,
  };
};

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
