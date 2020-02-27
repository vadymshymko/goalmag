import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCompetitions } from 'actions';
import { getRegionsWithCompetitions } from 'selectors';

import AppNavSection from 'components/AppNavSection';

import { Wrapper, List } from './styles';

function AppNav({ show }) {
  const dispatch = useDispatch();
  const regionsWithCompetitions = useSelector(getRegionsWithCompetitions);

  useEffect(() => {
    dispatch(fetchCompetitions());
  }, []);

  return (
    <Wrapper data-show={show}>
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
  );
}

AppNav.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default AppNav;
