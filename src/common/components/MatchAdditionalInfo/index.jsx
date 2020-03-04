import React, { useState } from 'react';
import Tabs from 'react-simply-tabs';
import PropTypes from 'prop-types';

import MatchEvents from 'components/MatchEvents';
import MatchLineup from 'components/MatchLineup';
import MatchStatistics from 'components/MatchStatistics';

import { Wrapper, InfoItem, InfoName, InfoValue, TabBtn } from './styles';

function MatchAdditionalInfo({
  referee,
  stadium,
  lineup,
  substitutions,
  statistics,
  events,
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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

      <Tabs
        activeTabIndex={activeTabIndex}
        onRequestChange={setActiveTabIndex}
        controls={[
          <TabBtn type="button" title="Events">
            Events
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
        <div>
          <MatchEvents events={events} />
        </div>

        <div>
          <MatchLineup lineup={lineup} substitutions={substitutions} />
        </div>

        <div>
          <MatchStatistics statistics={statistics} />
        </div>
      </Tabs>
    </Wrapper>
  );
}

MatchAdditionalInfo.propTypes = {
  referee: PropTypes.string,
  stadium: PropTypes.string,
  lineup: PropTypes.shape({
    localteam: PropTypes.arrayOf(PropTypes.object),
    visitorteam: PropTypes.arrayOf(PropTypes.object),
  }),
  substitutions: PropTypes.shape({
    localteam: PropTypes.arrayOf(PropTypes.object),
    visitorteam: PropTypes.arrayOf(PropTypes.object),
  }),
  statistics: PropTypes.shape({
    localteam: PropTypes.objectOf(PropTypes.any),
    visitorteam: PropTypes.objectOf(PropTypes.any),
  }),
  events: PropTypes.arrayOf(PropTypes.object),
};

MatchAdditionalInfo.defaultProps = {
  referee: '',
  stadium: '',
  lineup: {
    localteam: [],
    visitorteam: [],
  },
  substitutions: {
    localteam: [],
    visitorteam: [],
  },
  statistics: {
    localteam: {},
    visitorteam: {},
  },
  events: [],
};

export default MatchAdditionalInfo;
