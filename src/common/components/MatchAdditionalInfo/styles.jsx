import styled from 'styled-components';

import ContentSection from 'components/ContentSection';

export const Wrapper = styled(ContentSection)`
  & .tabs {
    padding: 30px 0;
  }

  & .tabsControls {
    border-bottom: 1px solid #f8f9fa;
    border-top: 1px solid #f8f9fa;
    display: flex;
    width: 100%;
  }
`;

export const InfoItem = styled.p`
  display: flex;
  width: 100%;
`;

export const InfoName = styled.span`
  color: #6c757d;
  opacity: 0.75;
  padding-right: 5px;
  text-align: right;
  width: 50%;
`;

export const InfoValue = styled.span`
  padding-left: 5px;
  width: 50%;
`;

export const TabBtn = styled.button`
  background: none;
  border: 0;
  outline: none;
  padding: 5px;
  width: calc(100% / 3);

  &:hover,
  &.active {
    background: #f8f9fa;
  }
`;
