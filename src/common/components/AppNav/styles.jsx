import styled from 'styled-components';

export const ToggleBtn = styled.button`
  background: none;
  border-bottom: 1px solid #fff;
  border-left: 0;
  border-right: 0;
  border-top: 1px solid #fff;
  box-shadow: none;
  height: 16px;
  left: 15px;
  outline: none;
  padding: 5px;
  position: fixed;
  top: 22px;
  width: 25px;
  z-index: 1;

  @media (min-width: 960px) {
    display: none;
  }

  &::before {
    background-color: #fff;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 6px;
    width: 100%;
  }
`;

export const Wrapper = styled.nav`
  background-color: #fff;
  bottom: 0;
  display: none;
  left: 0;
  line-height: 1;
  overflow: auto;
  padding: 30px 15px;
  position: fixed;
  top: 60px;
  min-width: 280px;
  width: 280px;
  z-index: 1;

  &.active {
    display: block;
  }

  @media (min-width: 960px) {
    border-right: 1px solid #f8f9fa;
    display: block;
    max-height: calc(100vh - 120px);
    margin-left: -15px;
    padding: 0 15px;
    position: static;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;
