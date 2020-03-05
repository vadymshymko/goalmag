import styled from 'styled-components';

import StyledTable from 'components/Table';

const Table = styled(StyledTable)`
  th:first-child,
  td:first-child {
    text-align: left;
    min-width: 90px;
    max-width: 90px;
    width: 90px;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  th:nth-child(2),
  th:nth-child(3),
  td:nth-child(2),
  td:nth-child(3) {
    min-width: 200px;
    max-width: 200px;
    width: 200px;
  }
`;

export default Table;
