import React, { memo } from 'react';

import AppHeader from 'components/AppHeader';
import AppContent from 'components/AppContent';

function App() {
  return (
    <>
      <AppHeader />

      <AppContent />
    </>
  );
}

export default memo(App);
