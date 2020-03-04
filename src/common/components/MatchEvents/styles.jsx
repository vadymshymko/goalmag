import styled from 'styled-components';

import Icon from 'components/Icon';

export const Wrapper = styled.section`
  font-size: 14px;
  line-height: 2;
`;

export const Event = styled.p`
  align-items: center;
  border-bottom: 1px solid #f8f9fa;
  display: flex;

  &[data-team-type='localteam'] {
    margin-right: auto;
    justify-content: flex-start;
  }

  &[data-team-type='visitorteam'] {
    margin-left: auto;
    justify-content: flex-end;
  }
`;

export const EventMinute = styled.span`
  display: inline-flex;
  margin-right: 5px;
`;

export const EventIcon = styled(Icon)`
  display: inline-flex;
  margin-right: 5px;
  width: 15px;
`;

export const EventDescription = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
