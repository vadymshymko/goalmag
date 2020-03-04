import styled from 'styled-components';

import TableWrapper from 'components/TableWrapper';
import Table from 'components/Table';

export const styledTableWrapper = styled(TableWrapper)`
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
    width: 30px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    text-align: left;
    min-width: 200px;
    width: 200px;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }
`;
