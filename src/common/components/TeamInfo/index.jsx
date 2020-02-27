import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { getTeamInfo } from 'selectors';

import TeamSquad from 'components/TeamSquad';
import TeamBasicInfo from 'components/TeamBasicInfo';

function TeamInfo() {
  const location = useLocation();
  const routerMatch = useRouteMatch();

  const teamInfo = useSelector(state =>
    getTeamInfo(state, {
      location,
      match: routerMatch,
    })
  );

  return (
    <>
      <TeamBasicInfo
        country={teamInfo.country}
        founded={teamInfo.founded}
        coach={teamInfo.coachName}
        venueName={teamInfo.venueName}
      />
      <TeamSquad squad={teamInfo.squad} />
    </>
  );
}

export default TeamInfo;
