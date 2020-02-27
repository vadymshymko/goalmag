import React from 'react';
import PropTypes from 'prop-types';

import PageContent from 'components/PageContent';
import MatchCenterPageMeta from 'components/MatchCenterPageMeta';
import MatchCenterCompetitions from 'components/MatchCenterCompetitions';

function MatchCenterPage({ initialAction }) {
  return (
    <PageContent>
      <MatchCenterPageMeta initialAction={initialAction} />

      <MatchCenterCompetitions />
    </PageContent>
  );
}

MatchCenterPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default MatchCenterPage;
