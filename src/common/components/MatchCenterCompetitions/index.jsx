import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';
import MatchCenterCompetition from 'components/MatchCenterCompetition';

function MatchCenterCompetitions({ competitionsWithMatches }) {
  return (
    <ContentSection>
      {competitionsWithMatches.map(competition => (
        <MatchCenterCompetition
          key={competition.id}
          id={competition.id}
          name={competition.name}
          region={competition.region}
          matchesItems={competition.matchesItems}
        />
      ))}
    </ContentSection>
  );
}

MatchCenterCompetitions.propTypes = {
  competitionsWithMatches: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(MatchCenterCompetitions);
