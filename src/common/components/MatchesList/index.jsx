import React, { memo } from 'react';
import PropTypes from 'prop-types';

import MatchLink from 'components/MatchLink';

import { Wrapper, Item } from './styles';

function MatchesList({ matchesItems }) {
  return (
    <Wrapper>
      {matchesItems.map(match => (
        <Item key={match.id}>
          <MatchLink
            id={match.id}
            localTeamName={match.localTeamName}
            localTeamScore={match.localTeamScore}
            visitorTeamName={match.visitorTeamName}
            visitorTeamScore={match.visitorTeamScore}
            status={match.status}
            startTime={match.startTime}
            timer={match.timer}
          />
        </Item>
      ))}
    </Wrapper>
  );
}

MatchesList.propTypes = {
  matchesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(MatchesList);
