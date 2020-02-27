import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';

function MatchCenterPageMeta({ initialAction }) {
  const dispatch = useDispatch();

  const location = useLocation();
  const routeMatch = useRouteMatch();

  useEffect(() => {
    initialAction(dispatch, { location, match: routeMatch });
  }, []);

  return (
    <>
      <PageHelmet
        title="Match Center"
        description="Live fixtures across all your favorite competitions - GoalMag"
      />
      <PageTitle>Match Center</PageTitle>
    </>
  );
}

MatchCenterPageMeta.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default MatchCenterPageMeta;
