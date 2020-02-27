import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MatchesList from 'components/MatchesList';

import { Wrapper, Title } from './styles';

function MatchCenterCompetition({ id, name, region, matchesItems }) {
  return (
    <Wrapper>
      <Title>
        <Link
          to={`/competitions/${id}`}
          href={`/competitions/${id}`}
          title={`${region}. ${name}`}
        >
          {`${region}. ${name}`}
        </Link>
      </Title>

      <MatchesList matchesItems={matchesItems} />
    </Wrapper>
  );
}

MatchCenterCompetition.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  matchesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(MatchCenterCompetition);
