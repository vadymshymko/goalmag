import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getRegionsWithCompetitions } from 'selectors';

import AppNavSection from 'components/AppNavSection';

import { ToggleBtn, Wrapper, List, Bg } from './styles';

function AppNav() {
  const regionsWithCompetitions = useSelector(getRegionsWithCompetitions);

  const [show, toggle] = useState(false);

  const handleToggle = useCallback(() => {
    toggle(!show);
  }, []);

  const handleCloseNav = useCallback(() => {
    toggle(false);
  }, []);

  return (
    <>
      <ToggleBtn
        type="button"
        onClick={handleToggle}
        title="Toggle Navigation"
      />

      <Wrapper className={`app-nav ${show ? 'active' : ''}`}>
        <List>
          <AppNavSection items={[{ name: 'Match Center', href: '/' }]} />

          {regionsWithCompetitions.map(region => {
            return (
              <AppNavSection
                name={region.name}
                items={region.competitions}
                key={region.name}
              />
            );
          })}
        </List>
      </Wrapper>

      <Bg className={`${show ? 'active' : ''}`} onClick={handleCloseNav} />
    </>
  );
}

export default AppNav;
