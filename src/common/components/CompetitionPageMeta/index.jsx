import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getCompetition } from 'selectors';

import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';

function CompetitionPageMeta({ initialAction }) {
  const dispatch = useDispatch();

  const location = useLocation();
  const routeMatch = useRouteMatch();

  const competitionInfo = useSelector(state =>
    getCompetition(state, { location, match: routeMatch })
  );

  useEffect(() => {
    initialAction(dispatch, { location, match: routeMatch });
  }, [routeMatch.params.competitionId]);

  return (
    <>
      <PageHelmet
        title={competitionInfo.name}
        description={`Fixtures, teams, squads and standings - ${competitionInfo.name}`}
      />
      <PageTitle>{competitionInfo.name}</PageTitle>
    </>
  );
}

CompetitionPageMeta.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default CompetitionPageMeta;
