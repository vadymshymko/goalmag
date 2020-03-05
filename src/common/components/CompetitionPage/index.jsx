import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  getDate,
} from 'selectors';

const ErrorPage = loadable(() => import('components/ErrorPage'));

function CompetitionPage({
  initialAction,
  location,
  match,
  history,
  staticContext,
}) {
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
    getDate(state, { location, match })
  );
  const formattedMatchesDateValue = useMemo(
    () =>
      `${matchesDateValue.split('.')[2]}-${matchesDateValue.split('.')[1]}-${
        matchesDateValue.split('.')[0]
      }`,
    [matchesDateValue]
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
    return <ErrorPage staticContext={staticContext} errorCode={404} />;
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
        matchesDate={formattedMatchesDateValue}
        onRequestMatchesDateChange={handleMatchesDateChange}
      />

      <CompetitionStandings standings={competitionStandings} />
    </Page>
  );
}

CompetitionPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  staticContext: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

CompetitionPage.defaultProps = {
  staticContext: null,
};

export default CompetitionPage;
