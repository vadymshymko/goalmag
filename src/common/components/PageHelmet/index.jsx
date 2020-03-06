import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function PageHelmet({ title, description }) {
  const location = useLocation();

  return (
    <>
      <Helmet
        title={`${title} - GoalMag`}
        meta={[
          description
            ? {
                name: 'description',
                content: description,
              }
            : {},
          {
            itemProp: 'name',
            content: `${title} - GoalMag`,
          },
          description
            ? {
                itemProp: 'description',
                content: description,
              }
            : {},
          {
            name: 'twitter:title',
            content: `${title} - GoalMag`,
          },
          description
            ? {
                name: 'twitter:description',
                content: description,
              }
            : {},
          {
            name: 'og:title',
            content: `${title} - GoalMag`,
          },
          description
            ? {
                name: 'og:description',
                content: description,
              }
            : {},
          {
            name: 'og:url',
            content: `https://goal.now.sh${location.pathname}${location.search}`,
          },
        ]}
      />
    </>
  );
}

PageHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

PageHelmet.defaultProps = {
  description: null,
};

export default PageHelmet;
