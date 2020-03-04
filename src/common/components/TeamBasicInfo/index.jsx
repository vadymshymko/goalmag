import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';

import { Item, Name, Value } from './styles';

function TeamBasicInfo({ country, founded, coach, venueName }) {
  return (
    <ContentSection>
      <Item>
        <Name>Country:</Name>
        {` `}
        <Value>{country}</Value>
      </Item>
      <Item>
        <Name>Founded:</Name>
        {` `}
        <Value>{founded}</Value>
      </Item>
      <Item>
        <Name>Stadium:</Name>
        {` `}
        <Value>{venueName}</Value>
      </Item>
      <Item>
        <Name>Coach:</Name>
        {` `}
        <Value>{coach}</Value>
      </Item>
    </ContentSection>
  );
}

TeamBasicInfo.propTypes = {
  country: PropTypes.string,
  founded: PropTypes.string,
  coach: PropTypes.string,
  venueName: PropTypes.string,
};

TeamBasicInfo.defaultProps = {
  country: '',
  founded: '',
  coach: '',
  venueName: '',
};

export default memo(TeamBasicInfo);
