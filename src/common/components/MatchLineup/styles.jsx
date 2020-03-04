import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Lineup = styled.section`
  display: flex;
  font-size: 14px;
  line-height: 2;
  flex-flow: row wrap;
  width: 100%;
`;

export const LineupTitle = styled.h3`
  border-bottom: 1px solid #f8f9fa;
  border-top: 1px solid #f8f9fa;
  font-size: 14px;
  text-align: center;
  width: 100%;
`;

export const PlayersList = styled.ul`
  border-bottom: 1px solid #f8f9fa;
  border-left: 1px solid #f8f9fa;
  list-style: none;
  padding: 0 5px;
  width: 50%;

  &:last-child {
    border-right: 1px solid #f8f9fa;
  }
`;

export const Player = styled.li`
  align-items: center;
  display: inline-flex;
  width: 100%;
`;

export const PlayerName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const PlayerNumber = styled.span`
  color: #6c757d;
  min-width: 30px;
  width: 30px;
`;

export const PlayerLink = styled(Link)`
  color: #343a40;

  &:hover {
    color: rgba(40, 167, 69, 0.75);
  }
`;
