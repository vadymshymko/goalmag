import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.header`
  background-color: #343a40;
  left: 0;
  padding: 15px 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export const Inner = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

export const Title = styled.h1`
  align-items: center;
  display: inline-flex;
  margin-left: 40px;

  @media (min-width: 960px) {
    margin-left: 0;
  }
`;

export const TitleLink = styled(Link)`
  color: #28a745;
  display: flex;

  &:hover,
  &:active {
    color: #28a745;
  }
`;

export const Caption = styled.span`
  font-size: 20px;
  font-weight: 900;
  margin-left: 5px;
`;
