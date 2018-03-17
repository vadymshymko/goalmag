import React from 'react';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';

import './NotFoundPage.scss';

const NotFoundPage = () => (
  <AppPage
    title="Page Not Found"
    className="NotFoundPage"
  >
    <AppPageHeader>
      <AppPageTitle>Page Not Found</AppPageTitle>
    </AppPageHeader>

    <AppPageContent>
      <p className="NotFoundPage__caption">Page you are looking for could not be found</p>
    </AppPageContent>
  </AppPage>
);

export default NotFoundPage;
