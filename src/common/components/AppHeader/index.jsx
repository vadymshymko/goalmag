import React, { memo } from 'react';

import LayoutContainer from 'components/LayoutContainer';

import { Wrapper, Inner, Title, TitleLink, Caption } from './styles';

function AppHeader() {
  return (
    <Wrapper>
      <LayoutContainer>
        <Inner>
          <Title>
            <TitleLink to="/" href="/" title="GoalNow">
              <svg width="30" height="30" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="15" fill="#28a745" />
                <circle cx="15" cy="15" r="3" fill="#343a40" />
                <circle
                  cx="15"
                  cy="15"
                  r="8"
                  fill="none"
                  stroke="#343a40"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="0"
                  x2="15"
                  y2="30"
                  stroke="#343a40"
                  strokeWidth="2"
                />
              </svg>
              <Caption>GoalNow</Caption>
            </TitleLink>
          </Title>
        </Inner>
      </LayoutContainer>
    </Wrapper>
  );
}

export default memo(AppHeader);
