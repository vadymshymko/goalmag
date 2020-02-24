import styled from 'styled-components';

export const Wrapper = styled.main``;

export const Inner = styled.div`
  padding-top: 90px;
  width: 100%;

  @media (min-width: 960px) {
    padding-left: 270px;
    width: calc(100% - 270px);
  }

  @media (min-width: 1200px) {
    width: 870px;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  padding-bottom: 20px;
`;

export const Content = styled.div``;
