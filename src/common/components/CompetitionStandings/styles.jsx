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
    min-width: 30px;
    max-width: 30px;
    width: 30px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    min-width: 12px;
    padding: 0;
    max-width: 12px;
    width: 12px;
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
    min-width: 105px;
    max-width: 105px;
    width: 105px;
  }
`;

export const Status = styled.span`
  display: inline-flex;

  &.same {
    background-color: rgba(108, 117, 125, 0.5);
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }

  &.up {
    border-color: transparent transparent #28a745 transparent;
    border-style: solid;
    border-width: 0 6px 8px 6px;
    height: 0;
    width: 0;
  }

  &.down {
    border-color: #dc3545 transparent transparent transparent;
    border-style: solid;
    border-width: 8px 6px 0 6px;
    height: 0;
    width: 0;
  }
`;

export const FormIcon = styled.span`
  border-radius: 50%;
  display: inline-flex;
  height: 15px;
  width: 15px;

  &:not(:last-child) {
    margin-right: 5px;
  }

  &.form-w {
    background-color: #28a745;
  }

  &.form-d {
    background-color: rgba(108, 117, 125, 0.5);
  }

  &.form-l {
    background-color: #dc3545;
  }
`;
