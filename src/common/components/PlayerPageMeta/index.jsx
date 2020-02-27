import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getPlayerInfo } from 'selectors';

import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';

function PlayerPageMeta({ initialAction }) {
  const dispatch = useDispatch();

  const location = useLocation();
  const routeMatch = useRouteMatch();

  const playerInfo = useSelector(state =>
    getPlayerInfo(state, { location, match: routeMatch })
  );

  useEffect(() => {
    initialAction(dispatch, { location, match: routeMatch });
  }, []);

  return (
    <>
      <PageHelmet
        title={`${playerInfo.firstname} ${playerInfo.lastname}`}
        description={`Profile and Statistics - ${playerInfo.firstname} ${playerInfo.lastname}`}
      />
      <PageTitle>{`${playerInfo.firstname} ${playerInfo.lastname}`}</PageTitle>
    </>
  );
}

PlayerPageMeta.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default PlayerPageMeta;
