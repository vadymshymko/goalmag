import React from 'react';
import loadable from '@loadable/component';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotFoundPage = loadable(() => import('components/NotFoundPage'));
const InternalServerErrorPage = loadable(() =>
  import('components/InternalServerErrorPage')
);

function ErrorPage({ staticContext, errorCode }) {
  if (staticContext) {
    staticContext.status = 404; //eslint-disable-line
  }

  if (errorCode === 404) {
    return <NotFoundPage />;
  }

  return <InternalServerErrorPage />;
}

ErrorPage.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any),
  errorCode: PropTypes.number,
};

ErrorPage.defaultProps = {
  staticContext: null,
  errorCode: null,
};

export default withRouter(ErrorPage);
