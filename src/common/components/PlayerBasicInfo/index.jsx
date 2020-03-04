import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';

import { Item, Name, Value } from './styles';

function PlayerBasicInfo({
  birthdate,
  teamName,
  teamId,
  position,
  weight,
  height,
}) {
  return (
    <ContentSection>
      <Item>
        <Name>Birthdate:</Name>
        {` `}
        <Value>{birthdate}</Value>
      </Item>

      <Item>
        <Name>Team:</Name>
        {` `}
        <Value>
          <Link
            href={`/teams/${teamId}`}
            to={`/teams/${teamId}`}
            title={teamName}
          >
            {teamName}
          </Link>
        </Value>
      </Item>

      <Item>
        <Name>Position:</Name>
        {` `}
        <Value>{position}</Value>
      </Item>

      <Item>
        <Name>Weight:</Name>
        {` `}
        <Value>{weight}</Value>
      </Item>

      <Item>
        <Name>Height:</Name>
        {` `}
        <Value>{height}</Value>
      </Item>
    </ContentSection>
  );
}

PlayerBasicInfo.propTypes = {
  birthdate: PropTypes.string,
  teamName: PropTypes.string,
  teamId: PropTypes.string,
  position: PropTypes.string,
  weight: PropTypes.string,
  height: PropTypes.string,
};

PlayerBasicInfo.defaultProps = {
  birthdate: '',
  teamName: '',
  teamId: '',
  position: '',
  weight: '',
  height: '',
};

export default memo(PlayerBasicInfo);
