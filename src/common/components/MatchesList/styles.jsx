import styled from 'styled-components';

export const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Item = styled.li`
  border-bottom: 1px solid #f8f9fa;

  &:first-child {
    border-top: 1px solid #f8f9fa;
  }
`;
