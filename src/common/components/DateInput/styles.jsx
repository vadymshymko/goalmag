import styled from 'styled-components';

export const Wrapper = styled.label`
  color: rgba(40, 167, 69, 0.75);
  font-weight: 400;
  margin: 0 0 0 auto;
`;

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 1px solid;
  color: rgba(40, 167, 69, 0.75);
  cursor: pointer;
  font-size: 13px;
  height: 18px;
  outline: none;

  &:hover {
    color: #28a745;
  }
`;
