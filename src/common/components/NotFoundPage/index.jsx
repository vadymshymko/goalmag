import React from 'react';
import PropTypes from 'prop-types';

function NotFoundPage({ staticContext }) {
  if (staticContext) {
    staticContext.status = 400; //eslint-disable-line
  }

  return <div>Not Found Page</div>;
}

NotFoundPage.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any),
};

NotFoundPage.defaultProps = {
  staticContext: null,
};

export default NotFoundPage;
