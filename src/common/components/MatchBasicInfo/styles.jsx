import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ContentSectionTitle from 'components/ContentSectionTitle';

export const Title = styled(ContentSectionTitle)`
  background: none;
  border-bottom: 1px solid #f8f9fa;
  padding: 0 0 5px;
`;

export const Date = styled.span`
  align-items: center;
  display: inline-flex;
  margin-left: auto;
`;

export const MainInfo = styled.div`
  border-bottom: 1px solid #f8f9fa;
  display: flex;
  flex-flow: row wrap;
  font-size: 20px;
  justify-content: center;
  padding: 15px 0;
  width: 100%;
`;

export const Team = styled.span`
  display: inline-flex;
  width: calc(50% - 5px);

  &:first-of-type {
    justify-content: flex-end;
  }
`;

export const TeamLink = styled(Link)`
  color: #343a40;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: rgba(40, 167, 69, 0.75);
  }
`;

export const TeamScore = styled.span`
  border: 1px solid #f8f9fa;
  display: inline-flex;
  height: 30px;
  justify-content: center;
  margin: 0 15px;
  min-width: 30px;
  width: 30px;
`;

export const Delimiter = styled.span`
  display: flex;
  justify-content: center;
  width: 10px;
`;

export const Time = styled.span`
  display: inline-flex;
  justify-content: center;
  padding-top: 15px;
  width: 100%;
`;

export const PenaltiesScore = styled.span`
  font-size: 15px;
  color: #6c757d;
  display: inline-flex;
  padding-top: 10px;
  flex-flow: row wrap;
  justify-content: center;
`;

export const PenaltiesScoreCaption = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
`;
