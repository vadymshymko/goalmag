import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import './AppPage.scss';

const AppPage = ({
  title,
  children,
  className,
}) => (
  <DocumentTitle title={title}>
    <main className={`AppPage ${className}`}>
      {children}
    </main>
  </DocumentTitle>
);

AppPage.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

AppPage.defaultProps = {
  className: '',
  title: '',
  children: null,
};

export default AppPage;
