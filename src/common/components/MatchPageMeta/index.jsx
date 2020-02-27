import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';

function MatchPageMeta({ initialAction }) {
  const dispatch = useDispatch();

  const location = useLocation();
  const routeMatch = useRouteMatch();

  useEffect(() => {
    initialAction(dispatch, { location, match: routeMatch });
  }, []);

  return (
    <>
      <PageHelmet title="MatchPage" description="Page description" />
      <PageTitle>MatchPage</PageTitle>
    </>
  );
}

MatchPageMeta.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default MatchPageMeta;
