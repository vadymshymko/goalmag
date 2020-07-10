import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 0;
  width: 0;

  @media (min-width: 960px) {
    max-width: 275px;
    min-width: 275px;
    width: 275px;
  }
`;

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
  z-index: 3;

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

export const Inner = styled.nav`
  background-color: #fff;
  border-right: 1px solid #f8f9fa;
  bottom: 0;
  display: none;
  left: 0;
  line-height: 1;
  overflow: auto;
  padding: 30px 15px;
  position: fixed;
  top: 60px;
  min-width: 290px;
  width: 290px;
  z-index: 2;

  &.active {
    display: block;
  }

  @media (min-width: 960px) {
    bottom: 30px;
    display: block;
    padding: 0 15px;
    top: 90px;
  }

  @media (min-width: 1200px) {
    left: calc(50vw - 570px);
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  bottom: 0;
  display: none;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  &.active {
    display: block;
  }

  @media (min-width: 960px) {
    display: none;

    &.active {
      display: none;
    }
  }
`;
