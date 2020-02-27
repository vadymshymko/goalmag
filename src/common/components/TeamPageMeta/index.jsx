import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getTeamInfo } from 'selectors';

import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';

function TeamPageMeta({ initialAction }) {
  const dispatch = useDispatch();

  const location = useLocation();
  const routeMatch = useRouteMatch();

  const teamInfo = useSelector(state =>
    getTeamInfo(state, { location, match: routeMatch })
  );

  useEffect(() => {
    initialAction(dispatch, { location, match: routeMatch });
  }, []);

  return (
    <>
      <PageHelmet
        title={teamInfo.name}
        description={`Team squad, players and fixtures - ${teamInfo.name}`}
      />
      <PageTitle>{teamInfo.name}</PageTitle>
    </>
  );
}

TeamPageMeta.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default TeamPageMeta;
