import styled from 'styled-components';

export const Wrapper = styled.header`
  background-color: #fff;
  box-shadow: 0 1px 0 #f8f9fa;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

export const Inner = styled.div`
  align-items: center;
  display: flex;
  padding: 16px 0;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  margin-left: 8px;
`;

export const AppNavToggleBtn = styled.button`
  background: none;
  border-bottom: 1px solid #343a40;
  border-left: 0;
  border-right: 0;
  border-top: 1px solid #343a40;
  box-shadow: none;
  height: 25px;
  margin-left: auto;
  padding: 5px;
  position: relative;
  width: 30px;

  @media (min-width: 1200px) {
    display: none;
  }

  &::before {
    background-color: #343a40;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 12px;
    width: 100%;
  }
`;
