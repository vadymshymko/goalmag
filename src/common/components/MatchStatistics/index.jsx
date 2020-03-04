import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Values, Names, Value, Name } from './styles';

const TYPES = [
  {
    id: 'shotsTotal',
    name: 'Shots',
  },
  {
    id: 'shotsOngoal',
    name: 'Shots on target',
  },
  {
    id: 'saves',
    name: 'Saves',
  },
  {
    id: 'corners',
    name: 'Corners',
  },
  {
    id: 'fouls',
    name: 'Fouls',
  },
  {
    id: 'yellowcards',
    name: 'Yellow Cards',
  },
  {
    id: 'redcards',
    name: 'Red Cards',
  },
  {
    id: 'offsides',
    name: 'Offsides',
  },
];

function MatchStatistics({ statistics }) {
  return (
    <Wrapper>
      <Values>
        {TYPES.map(type => (
          <Value key={type.id}>{statistics.localteam[type.id]}</Value>
        ))}
      </Values>

      <Names>
        {TYPES.map(type => (
          <Name key={type.id}>{type.name}</Name>
        ))}
      </Names>

      <Values>
        {TYPES.map(type => (
          <Value key={type.id}>{statistics.visitorteam[type.id]}</Value>
        ))}
      </Values>
    </Wrapper>
  );
}

MatchStatistics.propTypes = {
  statistics: PropTypes.shape({
    localteam: PropTypes.objectOf(PropTypes.any),
    visitorteam: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default memo(MatchStatistics);
