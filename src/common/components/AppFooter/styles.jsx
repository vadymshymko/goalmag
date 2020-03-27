import styled from 'styled-components';

import Icon from 'components/Icon';

export const Wrapper = styled.footer`
  background-color: #f8f9fa;
  padding: 15px 0;
  width: 100%;
`;

export const Inner = styled.div`
  align-items: center;
  display: flex;
  height: 30px;
  justify-content: space-between;
  width: 100%;
`;

export const Copyright = styled.p`
  font-size: 13px;
  margin: 0;
`;

export const Links = styled.div`
  align-items: center;
  display: inline-flex;
`;

export const Link = styled.a`
  align-items: center;
  color: #343a40;
  display: inline-flex;

  &:hover {
    color: #28a745;
  }
`;

export const LinkIcon = styled(Icon)`
  border-radius: 50%;
  fill: #fff;
  margin-right: 5px;
  width: 25px;
`;
