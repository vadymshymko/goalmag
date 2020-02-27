import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function PageHelmet({ title, description }) {
  return (
    <>
      <Helmet
        title={`${title} - GoalMag`}
        meta={[
          {
            name: 'description',
            content: description,
          },
          {
            itemProp: 'name',
            content: `${title} - GoalMag`,
          },
          {
            itemProp: 'description',
            content: description,
          },
          {
            name: 'twitter:title',
            content: `${title} - GoalMag`,
          },
          {
            name: 'twitter:description',
            content: description,
          },
          {
            name: 'og:title',
            content: `${title} - GoalMag`,
          },
          {
            name: 'og:description',
            content: description,
          },
          {
            name: 'og:url',
            content: 'https://goalmag.herokuapp.com',
          },
        ]}
      />
    </>
  );
}

PageHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PageHelmet;
