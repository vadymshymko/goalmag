import React from 'react';
// import Tabs from 'react-simply-tabs';
import PropTypes from 'prop-types';

import { Wrapper, InfoItem, InfoName, InfoValue } from './styles';

function MatchAdditionalInfo({ referee, stadium }) {
  // const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Wrapper>
      <InfoItem>
        <InfoName>Referee:</InfoName>
        <InfoValue>{referee}</InfoValue>
      </InfoItem>

      <InfoItem>
        <InfoName>Stadium:</InfoName>
        <InfoValue>{stadium}</InfoValue>
      </InfoItem>

      {/* <Tabs
        activeTabIndex={activeTabIndex}
        onRequestChange={setActiveTabIndex}
        controls={[
          <TabBtn type="button" title="Events">
            Events
          </TabBtn>,
          <TabBtn type="button" title="Comments">
            Comments
          </TabBtn>,
          <TabBtn type="button" title="Lineups">
            Lineups
          </TabBtn>,
          <TabBtn type="button" title="Statistics">
            Statistics
          </TabBtn>,
        ]}
        activeControlProps={{
          className: 'active',
        }}
        controlsWrapperProps={{
          className: 'tabsControls',
        }}
        wrapperProps={{
          className: 'tabs',
        }}
      >
        <div>Events</div>

        <div>Comments</div>

        <div>Lineups</div>

        <div>Statistics</div>
      </Tabs> */}
    </Wrapper>
  );
}

MatchAdditionalInfo.propTypes = {
  referee: PropTypes.string,
  stadium: PropTypes.string,
};

MatchAdditionalInfo.defaultProps = {
  referee: '',
  stadium: '',
};

export default MatchAdditionalInfo;
