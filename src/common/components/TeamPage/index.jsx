import React from 'react';
import PropTypes from 'prop-types';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import SquadPlayersTable from 'components/SquadPlayersTable';

import './TeamPage.scss';

const TeamPage = ({
  name,
  logoURL,
  players,
  coachName,
}) => (
  <AppPage
    title={name}
    description={`Team squad, players and fixtures - ${name}`}
    className="TeamPage"
  >
    <AppPageHeader>
      <AppPageTitle>
        {logoURL && (
          <img
            className="TeamPage__logo"
            src={logoURL}
            alt={name}
            title={name}
          />
        )}

        {name}
      </AppPageTitle>
    </AppPageHeader>

    <AppPageContent>
      <SquadPlayersTable players={players} />

      {coachName && (
        <p className="TeamCoach">Coach: {coachName}</p>
      )}
    </AppPageContent>
  </AppPage>
);

TeamPage.propTypes = {
  name: PropTypes.string.isRequired,
  logoURL: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  coachName: PropTypes.string.isRequired,
};

export default TeamPage;
