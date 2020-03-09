import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Page from 'components/Page';
import PageHelmet from 'components/PageHelmet';
import PageTitle from 'components/PageTitle';
import MatchesNotFound from 'components/MatchesNotFound';
import MatchCenterCompetitions from 'components/MatchCenterCompetitions';
import DateInput from 'components/DateInput';

import {
  getCompetitionsWithMatches,
  getMatchesIsFetching,
  getUserDate,
} from 'selectors';

function MatchCenterPage({ initialAction }) {
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const competitionsWithMatches = useSelector(state =>
    getCompetitionsWithMatches(state, { location, match })
  );

  const matchesIsFetching = useSelector(state =>
    getMatchesIsFetching(state, { location, match })
  );

  const matchesDateValue = useSelector(state =>
    getUserDate(state, { location, match })
  );

  const competitionsMatchesCount = useMemo(
    () =>
      competitionsWithMatches.reduce((result, competition) => {
        return result + competition.matchesItems.length;
      }, 0),
    [competitionsWithMatches]
  );

  const handleMatchesDateChange = event => {
    history.push({
      search: `?date=${event.target.value}`,
    });
  };

  useEffect(() => {
    initialAction(dispatch, { location, match });
  }, [matchesDateValue]);

  return (
    <Page>
      <PageHelmet
        title="Match Center"
        description="Live fixtures across all your favorite competitions - GoalMag"
      />

      <PageTitle>
        <span>Match Center</span>

        <DateInput
          value={matchesDateValue}
          onChange={handleMatchesDateChange}
        />
      </PageTitle>

      {!matchesIsFetching && !competitionsMatchesCount ? (
        <MatchesNotFound />
      ) : (
        <MatchCenterCompetitions
          competitionsWithMatches={competitionsWithMatches}
        />
      )}
    </Page>
  );
}

MatchCenterPage.propTypes = {
  initialAction: PropTypes.func.isRequired,
};

export default MatchCenterPage;
