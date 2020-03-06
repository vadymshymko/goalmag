import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';

import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';
import MatchBasicInfo from 'components/MatchBasicInfo';
import MatchAdditionalInfo from 'components/MatchAdditionalInfo';

import {
  getMatch,
  getCompetitionByMatch,
  getMatchCommentaries,
} from 'selectors';

const ErrorPage = loadable(() => import('components/ErrorPage'));

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

  const title = `${matchInfo.localTeamName} ${matchInfo.localTeamScore} : ${matchInfo.visitorTeamScore} ${matchInfo.visitorTeamName}. ${matchInfo.dateUTC}`;
  const description = `${matchInfo.localTeamName} ${matchInfo.localTeamScore} : ${matchInfo.visitorTeamScore} ${matchInfo.visitorTeamName}. ${matchInfo.dateUTC}. Events, statistics, squads.`;

  if (!matchInfo.isFetching && matchInfo.isRequestFailed) {
    return (
      <ErrorPage
        staticContext={staticContext}
        errorCode={matchInfo.errorCode}
      />
    );
  }

  return (
    <Page>
      {matchInfo.isFetching ? null : (
        <>
          <PageHelmet title={title} description={description} />

          <MatchBasicInfo
            competitionName={matchCompetition.name}
            competitionRegion={matchCompetition.region}
            competitionId={matchInfo.competitionId}
            competitionWeek={matchInfo.week}
            localTeamName={matchInfo.localTeamName}
            localTeamId={matchInfo.localTeamId}
            localTeamScore={matchInfo.localTeamScore}
            localTeamPenaltyScore={matchInfo.localTeamPenaltyScore}
            visitorTeamName={matchInfo.visitorTeamName}
            visitorTeamId={matchInfo.visitorTeamId}
            visitorTeamScore={matchInfo.visitorTeamScore}
            visitorTeamPenaltyScore={matchInfo.visitorTeamPenaltyScore}
            status={matchInfo.status}
            timer={matchInfo.timer}
            startTime={matchInfo.startTime}
            dateUTC={matchInfo.dateUTC}
          />

          <MatchAdditionalInfo
            referee={matchCommentaries.referee}
            stadium={matchCommentaries.stadium}
            lineup={matchCommentaries.lineup}
            substitutions={matchCommentaries.subs}
            statistics={matchCommentaries.matchStats}
            events={matchInfo.events}
          />
        </>
      )}
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
