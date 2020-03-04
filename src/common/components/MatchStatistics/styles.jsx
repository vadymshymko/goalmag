import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  font-size: 14px;
  line-height: 2;
  width: 100%;
`;

export const Values = styled.div`
  width: 25%;

  &:last-of-type {
    text-align: right;
  }
`;

export const Names = styled.div`
  text-align: center;
  width: 50%;
`;

export const Name = styled.p`
  border-bottom: 1px solid #f8f9fa;
`;

export const Value = styled.p`
  border-bottom: 1px solid #f8f9fa;
  height: 29px;
`;
