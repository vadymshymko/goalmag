import styled from 'styled-components';

import StyledTable from 'components/Table';

const Table = styled(StyledTable)`
  th:first-child,
  td:first-child {
    min-width: 30px;
    max-width: 30px;
    width: 30px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    text-align: left;
    min-width: 200px;
    max-width: 200px;
    width: 200px;
  }
`;

export default Table;
