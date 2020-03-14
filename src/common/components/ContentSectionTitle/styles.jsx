import styled from 'styled-components';

const Wrapper = styled.h2`
  background-color: #f8f9fa;
  color: rgba(108, 117, 125, 0.75);
  display: flex;
  font-size: 13px;
  font-weight: 400;
  padding: 5px;

  a {
    color: #343a40;
    text-decoration: none;

    &:hover {
      color: #28a745;
    }
  }
`;

export default Wrapper;
