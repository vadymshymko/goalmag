import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import NotFoundPage from 'components/NotFoundPage';
import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';
import MatchBasicInfo from 'components/MatchBasicInfo';
import MatchAdditionalInfo from 'components/MatchAdditionalInfo';

import {
  getMatch,
  getCompetitionByMatch,
  getMatchCommentaries,
} from 'selectors';

function MatchPage({ initialAction, location, match, staticContext }) {
  const dispatch = useDispatch();

  const matchInfo = useSelector(state => getMatch(state, { location, match }));
  const matchCompetition = useSelector(state =>
    getCompetitionByMatch(state, { location, match })
  );
  const matchCommentaries = useSelector(state =>
    getMatchCommentaries(state, { location, match })
  );

  useEffect(() => {
    initialAction(dispatch, { location, match });
  }, []);

  const title = `${matchInfo.localTeamName} - ${matchInfo.localTeamScore} : ${matchInfo.visitorTeamName} - ${matchInfo.visitorTeamScore}. ${matchInfo.dateUTC}`;
  const description = `${matchInfo.localTeamName} - ${matchInfo.localTeamScore} : ${matchInfo.visitorTeamName} - ${matchInfo.visitorTeamScore}. ${matchInfo.dateUTC}. Events, statistics, squads.`;

  if (matchInfo.isRequestFailed) {
    return <NotFoundPage staticContext={staticContext} />;
  }

  return (
    <Page>
      <PageHelmet title={title} description={description} />

      <MatchBasicInfo
        competitionName={matchCompetition.name}
        competitionRegion={matchCompetition.region}
        competitionId={matchInfo.competitionId}
        competitionWeek={matchInfo.week}
        localTeamName={matchInfo.localTeamName}
        localTeamId={matchInfo.localTeamId}
        localTeamScore={matchInfo.localTeamScore}
        visitorTeamName={matchInfo.visitorTeamName}
        visitorTeamId={matchInfo.visitorTeamId}
        visitorTeamScore={matchInfo.visitorTeamScore}
        status={matchInfo.status}
        timer={matchInfo.timer}
        startTime={matchInfo.startTime}
        dateUTC={matchInfo.dateUTC}
      />

      <MatchAdditionalInfo
        referee={matchCommentaries.referee}
        stadium={matchCommentaries.stadium}
      />
    </Page>
  );
}

MatchPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  staticContext: PropTypes.objectOf(PropTypes.any),
};

MatchPage.defaultProps = {
  staticContext: null,
};

export default MatchPage;
