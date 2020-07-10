import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getRegionsWithCompetitions } from 'selectors';

import AppNavSection from 'components/AppNavSection';

import { ToggleBtn, Wrapper, Inner, List, Bg } from './styles';

function AppNav() {
  const regionsWithCompetitions = useSelector(getRegionsWithCompetitions);
  const location = useLocation();

  const [show, toggle] = useState(false);

  const handleToggle = useCallback(() => {
    toggle(!show);
  }, [show]);

  const handleCloseNav = useCallback(() => {
    toggle(false);
  }, []);

  useEffect(() => {
    handleCloseNav();
  }, [location.pathname]);

  return (
    <Wrapper className="app-nav">
      <ToggleBtn
        type="button"
        onClick={handleToggle}
        title="Toggle Navigation"
      />

      <Inner className={show ? 'active' : ''}>
        <List>
          <AppNavSection items={[{ name: 'Match Center', href: '/' }]} />

          {regionsWithCompetitions.map((region) => {
            return (
              <AppNavSection
                name={region.name}
                items={region.competitions}
                key={region.name}
              />
            );
          })}
        </List>
      </Inner>

      <Bg className={`${show ? 'active' : ''}`} onClick={handleCloseNav} />
    </Wrapper>
  );
}

export default AppNav;
