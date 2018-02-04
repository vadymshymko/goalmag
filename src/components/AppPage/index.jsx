import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

const AppPage = ({
  title,
  children,
}) => (
  <DocumentTitle title={title}>
    <main className="AppPage">
      {children}
    </main>
  </DocumentTitle>
);

AppPage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

AppPage.defaultProps = {
  title: '',
  children: null,
};

export default AppPage;
