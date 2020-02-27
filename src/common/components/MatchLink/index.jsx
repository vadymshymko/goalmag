import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Status,
  Team,
  TeamName,
  TeamScore,
  ScoreDelimiter,
} from './styles';

function MatchLink({
  id,
  localteamName,
  localteamScore,
  visitorteamName,
  visitorteamScore,
  status,
  timer,
  startTime,
}) {
  return (
    <Wrapper
      href={`/matches/${id}`}
      to={`/matches/${id}`}
      title={`${localteamName} : ${visitorteamName}`}
    >
      <Status>{timer || status || startTime}</Status>

      <Team data-type="local">
        <TeamName>{localteamName}</TeamName>

        <TeamScore>{localteamScore}</TeamScore>
      </Team>

      <ScoreDelimiter> : </ScoreDelimiter>

      <Team data-type="visitor">
        <TeamScore>{visitorteamScore}</TeamScore>

        <TeamName>{visitorteamName}</TeamName>
      </Team>
    </Wrapper>
  );
}

MatchLink.propTypes = {
  id: PropTypes.string.isRequired,
  localteamName: PropTypes.string.isRequired,
  localteamScore: PropTypes.string.isRequired,
  visitorteamName: PropTypes.string.isRequired,
  visitorteamScore: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timer: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
};

export default memo(MatchLink);
