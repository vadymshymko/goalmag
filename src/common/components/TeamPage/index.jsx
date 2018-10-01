import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import SquadPlayersTable from 'components/SquadPlayersTable';

import styles from './TeamPage.scss';

const TeamPage = ({
  name,
  logoURL,
  players,
  coachName,
}) => (
  <AppPage
    title={name}
    description={`Team squad, players and fixtures - ${name}`}
    className={styles.TeamPage}
  >
    <AppPageHeader>
      <AppPageTitle>
        {logoURL && (
          <img
            className={styles.TeamPage__logo}
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
        <p className={styles.TeamCoach}>Coach: {coachName}</p>
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

export default withStyles(styles)(TeamPage);
