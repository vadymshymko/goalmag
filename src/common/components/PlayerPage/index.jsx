import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';

import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';
import PlayerBasicInfo from 'components/PlayerBasicInfo';
import PlayerStatistics from 'components/PlayerStatistics';

import { getPlayer } from 'selectors';

const ErrorPage = loadable(() => import('components/ErrorPage'));

function PlayerPage({ initialAction, location, match, staticContext }) {
  const dispatch = useDispatch();

  const playerInfo = useSelector(state =>
    getPlayer(state, { location, match })
  );

  useEffect(() => {
    initialAction(dispatch, { location, match });
  }, [match.params.playerId]);

  const pageTitle = `${playerInfo.firstname || ''} ${playerInfo.lastname ||
    ''}`.trim();

  if (!playerInfo.isFetching && playerInfo.isRequestFailed) {
    return (
      <ErrorPage
        staticContext={staticContext}
        errorCode={playerInfo.errorCode}
      />
    );
  }

  return (
    <Page>
      {playerInfo.isFetching ? null : (
        <>
          <PageHelmet
            title={pageTitle}
            description={`Profile and Statistics - ${pageTitle}`}
          />

          <PageTitle>{pageTitle}</PageTitle>

          <PlayerBasicInfo
            birthdate={playerInfo.birthdate}
            teamName={playerInfo.team}
            teamId={playerInfo.teamid}
            position={playerInfo.position}
            weight={playerInfo.weight}
            height={playerInfo.height}
          />

          <PlayerStatistics statistics={playerInfo.playerStatistics} />
        </>
      )}
    </Page>
  );
}

PlayerPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  staticContext: PropTypes.objectOf(PropTypes.any),
};

PlayerPage.defaultProps = {
  staticContext: null,
};

export default PlayerPage;
