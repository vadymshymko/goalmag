import React from 'react';
import PropTypes from 'prop-types';

import PageContent from 'components/PageContent';
import PlayerPageMeta from 'components/PlayerPageMeta';

function PlayerPage({ initialAction }) {
  return (
    <PageContent>
      <PlayerPageMeta initialAction={initialAction} />
    </PageContent>
  );
}

PlayerPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default PlayerPage;
