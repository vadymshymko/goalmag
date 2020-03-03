import styled from 'styled-components';

import StyledTable from 'components/Table';

const Table = styled(StyledTable)`
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

  th:nth-child(3),
  td:nth-child(3) {
    text-align: left;
    min-width: 200px;
    width: 200px;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }
`;

export default Table;
