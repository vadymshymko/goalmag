import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import MatchesNotFound from 'components/MatchesNotFound';
import MatchesList from 'components/MatchesList';
import DateInput from 'components/DateInput';

function CompetitionMatches({
  matchesItems,
  matchesIsFetching,
  matchesDate,
  onRequestMatchesDateChange,
}) {
  return (
    <ContentSection>
      <ContentSectionTitle>
        <span>Matches:</span>

        <DateInput value={matchesDate} onChange={onRequestMatchesDateChange} />
      </ContentSectionTitle>

      {!matchesIsFetching && !matchesItems.length ? (
        <MatchesNotFound />
      ) : (
        <MatchesList matchesItems={matchesItems} />
      )}
    </ContentSection>
  );
}

CompetitionMatches.propTypes = {
  matchesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  matchesIsFetching: PropTypes.bool.isRequired,
  matchesDate: PropTypes.string.isRequired,
  onRequestMatchesDateChange: PropTypes.func.isRequired,
};

export default memo(CompetitionMatches);
