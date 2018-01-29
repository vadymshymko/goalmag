import React from 'react';
import Container from 'components/Container';

import './AppFooter.scss';

const AppFooter = () => {
  const currentDate = new Date();
  const currentDateYear = currentDate.getFullYear();

  return (
    <footer className="AppFooter">
      <Container>
        <p className="AppFooter__copyright">Copyright (c) {currentDateYear} Copyright Holder All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default AppFooter;
