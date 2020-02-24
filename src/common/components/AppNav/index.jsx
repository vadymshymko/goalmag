import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCompetitions } from 'actions';
import { getCompetitionsNavSections } from 'selectors';

import AppNavSection from 'components/AppNavSection';

import { Wrapper, List } from './styles';

function AppNav({ show }) {
  const dispatch = useDispatch();
  const competitionsNavSections = useSelector(getCompetitionsNavSections);

  useEffect(() => {
    dispatch(fetchCompetitions());
  }, []);

  return (
    <Wrapper data-show={show}>
      <List>
        <AppNavSection items={[{ name: 'Match Center', href: '/' }]} />

        {competitionsNavSections.map(item => {
          return (
            <AppNavSection
              name={item.region}
              items={item.competitions}
              key={item.region}
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
