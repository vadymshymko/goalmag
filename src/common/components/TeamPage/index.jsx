import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import NotFoundPage from 'components/NotFoundPage';
import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';
import TeamSquad from 'components/TeamSquad';
import TeamBasicInfo from 'components/TeamBasicInfo';

import { getTeam } from 'selectors';

function TeamPage({ initialAction, location, match, staticContext }) {
  const dispatch = useDispatch();

  const teamInfo = useSelector(state => getTeam(state, { location, match }));

  const pageTitle = teamInfo.name || '';

  useEffect(() => {
    initialAction(dispatch, { location, match });
  }, [match.params.teamId]);

  if (!teamInfo.isFetching && teamInfo.isRequestFailed) {
    return <NotFoundPage staticContext={staticContext} />;
  }

  return (
    <Page>
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
    </Page>
  );
}

TeamPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  staticContext: PropTypes.objectOf(PropTypes.any),
};

TeamPage.defaultProps = {
  staticContext: null,
};

export default TeamPage;
