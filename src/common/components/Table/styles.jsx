import styled from 'styled-components';

const Wrapper = styled.table`
  border-collapse: collapse;
  line-height: 1;
  font-size: 15px;
  table-layout: fixed;
  min-width: 100%;

  tr {
    border-bottom: 1px solid #f8f9fa;
  }

  th {
    color: #6c757d;
    font-size: 13px;
    font-weight: 400;
    height: 30px;
    opacity: 0.75;
    text-align: inherit;
  }

  td {
    height: 45px;
  }

  th,
  td {
    padding: 0 5px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  a {
    align-items: center;
    color: #343a40;
    display: inline-flex;
    height: 100%;
    width: 100%;

    &:hover {
      color: rgba(40, 167, 69, 0.75);
    }
  }
`;

export default Wrapper;
