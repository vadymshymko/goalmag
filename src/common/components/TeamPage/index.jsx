import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';

import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';
import TeamSquad from 'components/TeamSquad';
import TeamBasicInfo from 'components/TeamBasicInfo';

import { getTeam } from 'selectors';

const ErrorPage = loadable(() => import('components/ErrorPage'));

function TeamPage({ initialAction }) {
  const location = useLocation();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const teamInfo = useSelector(state => getTeam(state, { location, match }));

  const pageTitle = teamInfo.name || '';

  useEffect(() => {
    initialAction(dispatch, { location, match });
  }, [match.params.teamId]);

  if (!teamInfo.isFetching && teamInfo.isRequestFailed) {
    return <ErrorPage errorCode={teamInfo.errorCode} />;
  }

  return (
    <Page>
      {teamInfo.isFetching ? null : (
        <>
          <PageHelmet
            title={pageTitle}
            description={`Team squad, players and fixtures - ${pageTitle}`}
          />

          <PageTitle>{pageTitle}</PageTitle>

          <TeamBasicInfo
            country={teamInfo.country}
            founded={teamInfo.founded}
            coach={teamInfo.coachName}
            venueName={teamInfo.venueName}
          />

          <TeamSquad squad={teamInfo.squad} />
        </>
      )}
    </Page>
  );
}

TeamPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default TeamPage;
