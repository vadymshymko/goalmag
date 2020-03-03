import React from 'react';
import PropTypes from 'prop-types';

import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';

import { Message, Code, Title, LinkToHomePage } from './styles';

function NotFoundPage({ staticContext }) {
  if (staticContext) {
    staticContext.status = 404; //eslint-disable-line
  }

  return (
    <Page withNav={false}>
      <PageHelmet title="Page Not Found" />

      <Message>
        <Code>404</Code>
        <Title>Oops! Page not found</Title>
        <LinkToHomePage to="/" href="/" title="Go to homepage">
          Go to homepage
        </LinkToHomePage>
      </Message>
    </Page>
  );
}

NotFoundPage.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any),
};

NotFoundPage.defaultProps = {
  staticContext: null,
};

export default NotFoundPage;
