import React from 'react';

import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';

import { Message, Code, Title, LinkToHomePage } from './styles';

function InternalServerErrorPage() {
  return (
    <Page withNav={false}>
      <PageHelmet title="Page Not Found" />

      <Message>
        <Code>500</Code>
        <Title>Internal Server Error</Title>

        <p>Try a little later, or:</p>

        <LinkToHomePage to="/" href="/" title="Go to homepage">
          Go to homepage
        </LinkToHomePage>
      </Message>
    </Page>
  );
}

export default InternalServerErrorPage;
