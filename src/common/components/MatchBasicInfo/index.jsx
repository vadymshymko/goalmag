import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';

import {
  Title,
  Date,
  MainInfo,
  Team,
  TeamLink,
  TeamScore,
  Delimiter,
  Time,
} from './styles';

const STATUS_COLORS = {
  FT: '#343a40',
  HT: '#ffc107',
  live: '#28a745',
};

function MatchBasicInfo({
  competitionId,
  competitionName,
  competitionRegion,
  competitionWeek,
  localTeamName,
  localTeamId,
  localTeamScore,
  visitorTeamName,
  visitorTeamId,
  visitorTeamScore,
  status,
  timer,
  dateUTC,
  startTime,
}) {
  const statusColor = STATUS_COLORS[timer ? 'live' : status] || null;

  return (
    <ContentSection>
      <Title>
        {`${competitionRegion}.`}
        &nbsp;
        <TeamLink
          to={`/competitions/${competitionId}`}
          href={`/competitions/${competitionId}`}
          title={competitionName}
        >
          {competitionName}
        </TeamLink>
        {competitionWeek && ` - week ${competitionWeek}`}
        <Date>{`${dateUTC} ${startTime}`}</Date>
      </Title>

      <MainInfo>
        <Team>
          <TeamLink
            to={`/teams/${localTeamId}`}
            href={`/teams/${localTeamId}`}
            title={localTeamName}
          >
            {localTeamName}
          </TeamLink>

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

        <Delimiter>:</Delimiter>

        <Team>
          <TeamScore
            style={{
              borderColor: statusColor,
              backgroundColor: statusColor,
              color: statusColor ? '#fff' : null,
            }}
          >
            {visitorTeamScore}
          </TeamScore>

          <TeamLink
            to={`/teams/${visitorTeamId}`}
            href={`/teams/${visitorTeamId}`}
            title={visitorTeamName}
          >
            {visitorTeamName}
          </TeamLink>
        </Team>

        <Time style={{ color: statusColor }}>{timer || status}</Time>
      </MainInfo>
    </ContentSection>
  );
}

MatchBasicInfo.propTypes = {
  competitionId: PropTypes.string.isRequired,
  competitionName: PropTypes.string.isRequired,
  competitionRegion: PropTypes.string.isRequired,
  competitionWeek: PropTypes.string,
  localTeamId: PropTypes.string.isRequired,
  localTeamName: PropTypes.string.isRequired,
  localTeamScore: PropTypes.string.isRequired,
  visitorTeamId: PropTypes.string.isRequired,
  visitorTeamName: PropTypes.string.isRequired,
  visitorTeamScore: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timer: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  dateUTC: PropTypes.string.isRequired,
};

MatchBasicInfo.defaultProps = {
  competitionWeek: null,
};

export default memo(MatchBasicInfo);
