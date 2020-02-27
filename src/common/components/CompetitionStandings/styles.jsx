import styled from 'styled-components';
import { Link } from 'react-router-dom';

import StatsTable from 'components/StatsTable';

export const Table = styled(StatsTable)`
  &:not(:last-child) {
    margin-bottom: 45px;
  }

  th:first-child,
  td:first-child {
    padding-right: 0;
    padding-left: 0;
    min-width: 30px;
    width: 30px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    text-align: left;
    width: 200px;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  tbody tr {
    :hover {
      background-color: #f8f9fa;
    }
  }
`;

export const TeamLink = styled(Link)`
  color: #343a40;
  display: block;
  max-width: 100%;
  position: relative;
`;

export const TeamName = styled.span`
  display: block;
  overflow: hidden;
  padding: 5px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TeamLinkOverlay = styled.span`
  height: 60px;
  left: -35px;
  position: absolute;
  right: -325px;
  top: 50%;
  transform: translateY(-50%);
`;
