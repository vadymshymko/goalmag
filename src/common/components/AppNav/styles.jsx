import styled from 'styled-components';

export const Wrapper = styled.nav`
  display: none;
  line-height: 1;
  max-height: calc(100vh - 128px);
  max-width: 290px;
  overflow: auto;
  position: fixed;
  top: 90px;
  width: 100%;

  &[data-show='true'] {
    display: block;
  }

  @media (min-width: 1200px) {
    display: block;
    left: calc(50vw - 555px);
    right: auto;
    top: 96px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;
