import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
  align-items: center;
  color: #343a40;
  display: flex;
  height: 45px;
  padding: 0 5px;
  width: 100%;
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

  ${/* sc-sel */ Wrapper}:hover & {
    color: rgba(40, 167, 69, 0.75);
  }
`;

export const TeamScore = styled.span`
  align-items: center;
  border: 1px solid #f8f9fa;
  display: inline-flex;
  justify-content: center;
  height: 30px;
  min-width: 30px;
  padding: 5px;
  width: 30px;
`;

export const Delimiter = styled.span`
  text-align: center;
  width: 10px;
`;
