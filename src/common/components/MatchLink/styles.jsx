import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
  align-items: center;
  color: #343a40;
  display: flex;
  padding: 15px 5px;
  width: 100%;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const Status = styled.span`
  font-size: 13px;
  width: 40px;
`;

export const Team = styled.span`
  align-items: center;
  display: inline-flex;
  width: calc(50% - 45px);

  &[data-type='local'] {
    justify-content: flex-end;
    text-align: right;
  }
`;

export const TeamName = styled.span`
  overflow: hidden;
  padding: 0 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const TeamScore = styled.span`
  align-items: center;
  border: 1px solid #343a40;
  display: inline-flex;
  justify-content: center;
  height: 30px;
  min-width: 30px;
  padding: 5px;
  width: 30px;
`;

export const ScoreDelimiter = styled.span`
  text-align: center;
  width: 10px;
`;
