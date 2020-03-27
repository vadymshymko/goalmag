import styled from 'styled-components';

export const Wrapper = styled.section`
  padding-bottom: 30px;
  padding-top: 90px;
`;

export const Inner = styled.div`
  display: flex;
  width: 100%;
`;

export const Content = styled.main`
  width: 100%;

  @media (min-width: 960px) {
    .app-nav ~ & {
      max-width: calc(100% - 275px);
      padding-left: 30px;
    }
  }
`;
