import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import LayoutContainer from 'components/LayoutContainer';

import { Wrapper, Inner, Title, Content } from './styles';

function Page({ title, description, children }) {
  return (
    <Wrapper>
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

      <LayoutContainer>
        <Inner>
          <Title>{title}</Title>

          <Content>{children}</Content>
        </Inner>
      </LayoutContainer>
    </Wrapper>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
