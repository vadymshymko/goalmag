import styled from 'styled-components';

export const Wrapper = styled.section`
  &:not(:last-child) {
    padding-bottom: 30px;
  }
`;

export const Title = styled.h3`
  font-size: 13px;
  font-weight: 400;
  padding-bottom: 15px;

  a {
    color: #6c757d;

    &:hover {
      color: #28a745;
    }
  }
`;
