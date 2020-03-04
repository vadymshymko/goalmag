import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Status,
  Team,
  TeamName,
  TeamScore,
  Delimiter,
} from './styles';

const STATUS_COLORS = {
  FT: '#343a40',
  HT: '#ffc107',
  live: '#28a745',
};

function MatchLink({
  id,
  localTeamName,
  localTeamScore,
  visitorTeamName,
  visitorTeamScore,
  status,
  timer,
  startTime,
}) {
  const statusColor = STATUS_COLORS[timer ? 'live' : status] || null;

  return (
    <Wrapper
      href={`/matches/${id}`}
      to={`/matches/${id}`}
      title={`${localTeamName} : ${visitorTeamName}`}
    >
      <Status style={{ color: statusColor }}>
        {timer || status || startTime}
      </Status>

      <Team data-type="local">
        <TeamName>{localTeamName}</TeamName>

        <TeamScore
          style={{
            borderColor: statusColor,
            backgroundColor: statusColor,
            color: statusColor ? '#fff' : null,
          }}
        >
          {localTeamScore}
        </TeamScore>
      </Team>

      <Delimiter> : </Delimiter>

      <Team data-type="visitor">
        <TeamScore
          style={{
            borderColor: statusColor,
            backgroundColor: statusColor,
            color: statusColor ? '#fff' : null,
          }}
        >
          {visitorTeamScore}
        </TeamScore>

        <TeamName>{visitorTeamName}</TeamName>
      </Team>
    </Wrapper>
  );
}

MatchLink.propTypes = {
  id: PropTypes.string.isRequired,
  localTeamName: PropTypes.string.isRequired,
  localTeamScore: PropTypes.string.isRequired,
  visitorTeamName: PropTypes.string.isRequired,
  visitorTeamScore: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timer: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
};

export default memo(MatchLink);
