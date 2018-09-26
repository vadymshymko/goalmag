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
      <meta name="image" content="https://goalmag.herokuapp.com/logo.svg" />
      <meta itemProp="name" content={`${title} - Goal Magazine`} />
      <meta itemProp="description" content={`${description}`} />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title} - Goal Magazine`} />
      <meta name="twitter:description" content={`${description}`} />
      <meta name="twitter:site" content="@vadymshymko" />
      <meta name="twitter:creator" content="@vadymshymko" />
      <meta name="twitter:image:src" content="https://goalmag.herokuapp.com/logo.svg" />

      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta name="og:title" content={`${title} - Goal Magazine`} />
      <meta name="og:description" content={`${description}`} />
      <meta name="og:image" content="https://goalmag.herokuapp.com/logo.svg" />
      <meta name="og:url" content="https://goalmag.herokuapp.com" />
      <meta name="og:site_name" content="Goal Magazine" />
      <meta name="og:locale" content="en_US" />
      <meta name="fb:admins" content="100002165463093" />
      <meta name="fb:app_id" content="2048470848761820" />
      <meta name="og:type" content="website" />
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
