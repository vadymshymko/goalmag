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
    <Helmet
      title={`${title} - Goal Magazine`}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          name: 'image',
          content: 'https://goalmag.herokuapp.com/logo.svg',
        },
        {
          itemProp: 'name',
          content: `${title} - Goal Magazine`,
        },
        {
          itemProp: 'description',
          content: description,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: `${title} - Goal Magazine`,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:site',
          content: '@vadymshymko',
        },
        {
          name: 'twitter:creator',
          content: '@vadymshymko',
        },
        {
          name: 'twitter:image:src',
          content: 'https://goalmag.herokuapp.com/logo.svg',
        },
        {
          name: 'og:title',
          content: `${title} - Goal Magazine`,
        },
        {
          name: 'og:description',
          content: description,
        },
        {
          name: 'og:image',
          content: 'https://goalmag.herokuapp.com/logo.svg',
        },
        {
          name: 'og:url',
          content: 'https://goalmag.herokuapp.com',
        },
        {
          name: 'og:site_name',
          content: 'Goal Magazine',
        },
        {
          name: 'og:locale',
          content: 'en_US',
        },
        {
          name: 'fb:admins',
          content: '100002165463093',
        },
        {
          name: 'fb:app_id',
          content: '2048470848761820',
        },
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'msapplication-TileColor',
          content: '#00a300',
        },
        {
          name: 'msapplication-TileImage',
          content: '/mstile-144x144.png',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
        {
          name: 'google-site-verification',
          content: 'cySttcjM5zAsRGED5LSc0OdmgZTSwnzqtYAa3ytIfEs',
        },
      ]}
      link={[
        {
          href: '//fonts.googleapis.com/css?family=Roboto:400,500',
          rel: 'stylesheet',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#28a745',
        },
      ]}
    />

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
