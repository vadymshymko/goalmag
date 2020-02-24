import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled(NavLink)`
  color: #343a40;
  display: inline-flex;
  font-size: 15px;
  padding: 5px 0;

  &:hover,
  &.active {
    color: #28a745;
  }
`;

export default Wrapper;
