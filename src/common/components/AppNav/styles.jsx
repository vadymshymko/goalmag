import styled from 'styled-components';

export const Wrapper = styled.nav`
  background-color: #fff;
  display: none;
  left: 15px;
  line-height: 1;
  max-height: calc(100vh - 120px);
  max-width: 240px;
  overflow: auto;
  position: fixed;
  top: 90px;
  width: 100%;

  &[data-show='true'] {
    display: block;
  }

  @media (min-width: 960px) {
    display: block;
    right: auto;
  }

  @media (min-width: 1200px) {
    left: calc(50vw - 555px);
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;
