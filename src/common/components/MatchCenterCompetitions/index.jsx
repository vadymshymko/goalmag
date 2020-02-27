import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { getCompetitionsWithMatches, getMatchesIsFetching } from 'selectors';

import MatchCenterCompetition from 'components/MatchCenterCompetition';
import MatchesNotFound from 'components/MatchesNotFound';

function MatchCenterCompetitions() {
  const location = useLocation();
  const routerMatch = useRouteMatch();

  const competitionsWithMatches = useSelector(state =>
    getCompetitionsWithMatches(state, { location, match: routerMatch })
  );

  const matchesIsFetching = useSelector(state =>
    getMatchesIsFetching(state, { location, match: routerMatch })
  );

  const competitionsMatchesCount = useMemo(
    () =>
      competitionsWithMatches.reduce((result, competition) => {
        return result + competition.matchesItems.length;
      }, 0),
    [competitionsWithMatches]
  );

  if (!matchesIsFetching && !competitionsMatchesCount) {
    return <MatchesNotFound />;
  }

  return (
    <>
      {competitionsWithMatches.map(competition => (
        <MatchCenterCompetition
          key={competition.id}
          id={competition.id}
          name={competition.name}
          region={competition.region}
          matchesItems={competition.matchesItems}
        />
      ))}
    </>
  );
}

export default MatchCenterCompetitions;
