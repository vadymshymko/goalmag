import styled from 'styled-components';

export const Item = styled.p`
  line-height: 2;
`;

export const Name = styled.span`
  font-size: 13px;
  color: #6c757d;
  display: inline-block;
  width: 80px;
`;

export const Value = styled.span`
  a {
    color: #343a40;

    &:hover {
      text-decoration: underline;
    }
  }
`;
