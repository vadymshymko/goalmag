import styled from 'styled-components';

export const Wrapper = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #f8f9fa;
  left: 0;
  padding: 15px 0 14px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const Inner = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

export const Title = styled.div`
  align-items: center;
  display: inline-flex;
`;

export const Caption = styled.h1`
  font-size: 20px;
  font-weight: 900;
  margin-left: 5px;
`;

export const NavToggleBtn = styled.button`
  background: none;
  border-bottom: 1px solid #343a40;
  border-left: 0;
  border-right: 0;
  border-top: 1px solid #343a40;
  box-shadow: none;
  height: 20px;
  margin-right: 30px;
  padding: 5px;
  position: relative;
  width: 30px;

  @media (min-width: 960px) {
    display: none;
  }

  &::before {
    background-color: #343a40;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 9px;
    width: 100%;
  }
`;
