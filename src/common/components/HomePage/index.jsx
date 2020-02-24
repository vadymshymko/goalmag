import React from 'react';

import Page from 'components/Page';
import MatchesList from 'components/MatchesList';

function HomePage() {
  return (
    <Page title="Match Center" description="Page description">
      <MatchesList />
    </Page>
  );
}

export default HomePage;
