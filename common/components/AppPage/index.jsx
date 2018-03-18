import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const AppPage = ({
  title,
  description,
  children,
  className,
}) => (
  <main className={`AppPage ${className}`}>
    <Helmet>
      <title>{title} - Goal Magazine</title>
      <meta name="description" content={description} />

      {/* <!-- Schema.org for Google --> */}
      <meta itemProp="name" content={`${title} - Goal Magazine`} />
      <meta itemProp="description" content={`${description}`} />

      {/* <!-- Twitter --> */}
      <meta name="twitter:title" content={`${title} - Goal Magazine`} />
      <meta name="twitter:description" content={`${description}`} />

      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta name="og:title" content={`${title} - Goal Magazine`} />
      <meta name="og:description" content={`${description}`} />
    </Helmet>

    {children}
  </main>
);

AppPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

AppPage.defaultProps = {
  className: '',
  title: '',
  description: '',
  children: null,
};

export default AppPage;
