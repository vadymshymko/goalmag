import React from 'react';
import PropTypes from 'prop-types';

import PageContent from 'components/PageContent';
import TeamPageMeta from 'components/TeamPageMeta';
import TeamInfo from 'components/TeamInfo';

function TeamPage({ initialAction }) {
  return (
    <PageContent>
      <TeamPageMeta initialAction={initialAction} />

      <TeamInfo />
    </PageContent>
  );
}

TeamPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default TeamPage;
