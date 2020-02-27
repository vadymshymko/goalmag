import React from 'react';
import PropTypes from 'prop-types';

import PageContent from 'components/PageContent';
import MatchPageMeta from 'components/MatchPageMeta';

function MatchPage({ initialAction }) {
  return (
    <PageContent>
      <MatchPageMeta initialAction={initialAction} />
    </PageContent>
  );
}

MatchPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default MatchPage;
