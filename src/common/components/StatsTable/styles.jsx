import styled from 'styled-components';

const Wrapper = styled.table`
  border-collapse: collapse;
  line-height: 1;
  font-size: 15px;
  table-layout: fixed;
  width: 100%;

  tr {
    border-bottom: 1px solid #f8f9fa;
  }

  th {
    color: #6c757d;
    font-size: 13px;
    font-weight: 400;
    height: 30px;
    text-align: inherit;
    vertical-align: top;
  }

  td {
    height: 60px;
  }

  th,
  td {
    min-width: 40px;
    width: 40px;
    text-align: center;
  }
`;

export default Wrapper;
