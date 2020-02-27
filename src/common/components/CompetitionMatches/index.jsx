import React from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getVisibleMatchesItems, getMatchesIsFetching } from 'selectors';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import MatchesNotFound from 'components/MatchesNotFound';
import MatchesList from 'components/MatchesList';

function CompetitionMatches() {
  const location = useLocation();
  const routerMatch = useRouteMatch();

  const competitionMatchesItems = useSelector(state =>
    getVisibleMatchesItems(state, { location, match: routerMatch })
  );

  const matchesIsFetching = useSelector(state =>
    getMatchesIsFetching(state, { location, match: routerMatch })
  );

  return (
    <ContentSection>
      <ContentSectionTitle>Matches: </ContentSectionTitle>

      {!matchesIsFetching && !competitionMatchesItems.length ? (
        <MatchesNotFound />
      ) : (
        <MatchesList matchesItems={competitionMatchesItems} />
      )}
    </ContentSection>
  );
}

export default CompetitionMatches;
