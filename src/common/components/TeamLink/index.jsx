import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './TeamLink.scss';

const TeamLink = ({
  id,
  name,
  children,
  className,
}) => (
  <Link
    className={`TeamLink ${className}`}
    to={`/team/${id}`}
    href={`/team/${id}`}
    title={name}
  >
    {children || name}
  </Link>
);

TeamLink.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

TeamLink.defaultProps = {
  name: '',
  children: null,
  className: '',
};

export default TeamLink;
