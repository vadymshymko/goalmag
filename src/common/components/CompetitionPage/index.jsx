import React from 'react';
import PropTypes from 'prop-types';

import PageContent from 'components/PageContent';
import CompetitionPageMeta from 'components/CompetitionPageMeta';
import CompetitionMatches from 'components/CompetitionMatches';
import CompetitionStandings from 'components/CompetitionStandings';

function CompetitionPage({ initialAction }) {
  return (
    <PageContent>
      <CompetitionPageMeta initialAction={initialAction} />

      <CompetitionMatches />

      <CompetitionStandings />
    </PageContent>
  );
}

CompetitionPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default CompetitionPage;
