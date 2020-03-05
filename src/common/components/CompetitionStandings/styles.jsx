import styled from 'styled-components';

import TableWrapper from 'components/TableWrapper';
import Table from 'components/Table';

export const StyledTableWrapper = styled(TableWrapper)`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const StyledTable = styled(Table)`
  th:first-child,
  td:first-child {
    padding-right: 0;
    padding-left: 0;
    min-width: 30px;
    max-width: 30px;
    width: 30px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    min-width: 15px;
    padding: 0;
    max-width: 15px;
    width: 15px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    text-align: left;
    min-width: 180px;
    max-width: 180px;
    width: 180px;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }
`;

export const Status = styled.span`
  display: inline-flex;

  &.same {
    background-color: rgba(108, 117, 125, 0.5);
    border-radius: 50%;
    height: 5px;
    width: 5px;
  }

  &.up {
    border-color: transparent transparent #28a745 transparent;
    border-style: solid;
    border-width: 0 4px 5px 4px;
    height: 0;
    width: 0;
  }

  &.down {
    border-color: #dc3545 transparent transparent transparent;
    border-style: solid;
    border-width: 5px 4px 0 4px;
    height: 0;
    width: 0;
  }
`;
