import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './AppNav.scss';

const AppNav = ({ competitionsItems }) => (
  <nav className="AppNav">
    <ul className="AppNav__list">
      <li className="AppNav__item">
        <NavLink
          className="AppNav__link"
          activeClassName="AppNav__link--active"
          exact
          to="/match-center"
          title="Match Center"
        >
          Match Center
        </NavLink>
      </li>

      {competitionsItems.map(competition => (
        <li
          className="AppNav__item"
          key={competition.id}
        >
          <NavLink
            className="AppNav__link"
            activeClassName="AppNav__link--active"
            to={`/${competition.id}`}
            exact
            title={competition.caption}
          >
            {competition.caption}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

AppNav.propTypes = {
  competitionsItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    caption: PropTypes.string,
  })),
};

AppNav.defaultProps = {
  competitionsItems: [],
};

export default AppNav;
