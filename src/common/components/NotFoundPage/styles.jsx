import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Message = styled.article`
  align-items: center;
  display: flex;
  height: calc(100vh - 180px);
  justify-content: center;
  flex-flow: column;
  width: 100%;
`;

export const Code = styled.p`
  font-size: 30px;
  margin-bottom: 15px;
`;

export const Title = styled.h1`
  font-size: 15px;
  margin-bottom: 15px;
`;

export const LinkToHomePage = styled(Link)`
  align-items: center;
  background-color: #28a745;
  color: #fff;
  display: inline-flex;
  padding: 15px;

  &:hover {
    background-color: rgba(40, 167, 69, 0.75);
    color: #fff;
  }
`;
