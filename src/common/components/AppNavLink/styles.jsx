import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled(NavLink)`
  color: #343a40;
  display: inline-flex;
  padding: 5px 0;
  position: relative;

  &:hover,
  &.active {
    color: #28a745;

    &::before {
      background-color: #28a745;
      content: '';
      height: 25px;
      left: -10px;
      position: absolute;
      top: 0;
      width: 5px;
    }
  }
`;

export default Wrapper;
