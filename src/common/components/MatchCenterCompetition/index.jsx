import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import MatchesList from 'components/MatchesList';

function MatchCenterCompetition({ id, name, region, matchesItems }) {
  return (
    <ContentSection>
      <ContentSectionTitle>
        {`${region}.`}
        &nbsp;
        <Link
          to={`/competitions/${id}`}
          href={`/competitions/${id}`}
          title={name}
        >
          {name}
        </Link>
      </ContentSectionTitle>

      <MatchesList matchesItems={matchesItems} />
    </ContentSection>
  );
}

MatchCenterCompetition.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  matchesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(MatchCenterCompetition);
