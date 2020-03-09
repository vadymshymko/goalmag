import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';

import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';
import CompetitionMatches from 'components/CompetitionMatches';
import CompetitionStandings from 'components/CompetitionStandings';

import {
  getCompetition,
  getCompetitionStandingsTable,
  getVisibleMatchesItems,
  getMatchesIsFetching,
  getUserDate,
} from 'selectors';

const ErrorPage = loadable(() => import('components/ErrorPage'));

function CompetitionPage({ initialAction }) {
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const competitionInfo = useSelector(state =>
    getCompetition(state, { location, match })
  );

  const competitionStandings = useSelector(state =>
    getCompetitionStandingsTable(state, {
      location,
      match,
    })
  );

  const competitionMatchesItems = useSelector(state =>
    getVisibleMatchesItems(state, { location, match })
  );
  const matchesIsFetching = useSelector(state =>
    getMatchesIsFetching(state, { location, match })
  );
  const matchesDateValue = useSelector(state =>
    getUserDate(state, { location, match })
  );

  const handleMatchesDateChange = event => {
    history.push({
      search: `?date=${event.target.value}`,
    });
  };

  useEffect(() => {
    initialAction(dispatch, { location, match });
  }, [match.params.competitionId, matchesDateValue]);

  if (!competitionInfo.id) {
    return <ErrorPage errorCode={404} />;
  }

  return (
    <Page>
      <PageHelmet
        title={competitionInfo.name}
        description={`Fixtures, teams, squads and standings - ${competitionInfo.name}`}
      />

      <PageTitle>{competitionInfo.name}</PageTitle>

      <CompetitionMatches
        matchesItems={competitionMatchesItems}
        matchesIsFetching={matchesIsFetching}
        matchesDate={matchesDateValue}
        onRequestMatchesDateChange={handleMatchesDateChange}
      />

      <CompetitionStandings standings={competitionStandings} />
    </Page>
  );
}

CompetitionPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default CompetitionPage;
