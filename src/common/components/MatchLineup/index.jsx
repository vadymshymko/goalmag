import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Lineup,
  PlayersList,
  Player,
  PlayerName,
  PlayerNumber,
  PlayerLink,
  LineupTitle,
} from './styles';

function MatchLineup({ lineup, substitutions }) {
  return (
    <div>
      <Lineup>
        <PlayersList>
          {lineup.localteam.map(item => (
            <Player key={item.id}>
              <PlayerNumber>{item.number}</PlayerNumber>
              <PlayerName>
                <PlayerLink
                  to={`/players/${item.id}`}
                  href={`/players/${item.id}`}
                  title={item.name}
                >
                  {item.name}
                </PlayerLink>
              </PlayerName>
            </Player>
          ))}
        </PlayersList>

        <PlayersList>
          {lineup.visitorteam.map(item => (
            <Player key={item.id}>
              <PlayerNumber>{item.number}</PlayerNumber>
              <PlayerName>
                <PlayerLink
                  to={`/players/${item.id}`}
                  href={`/players/${item.id}`}
                  title={item.name}
                >
                  {item.name}
                </PlayerLink>
              </PlayerName>
            </Player>
          ))}
        </PlayersList>
      </Lineup>

      <Lineup>
        <LineupTitle>Substitutions:</LineupTitle>

        <PlayersList>
          {substitutions.localteam.map(item => (
            <Player key={item.id}>
              <PlayerNumber>{item.number}</PlayerNumber>
              <PlayerName>
                <PlayerLink
                  to={`/players/${item.id}`}
                  href={`/players/${item.id}`}
                  title={item.name}
                >
                  {item.name}
                </PlayerLink>
              </PlayerName>
            </Player>
          ))}
        </PlayersList>

        <PlayersList>
          {substitutions.visitorteam.map(item => (
            <Player key={item.id}>
              <PlayerNumber>{item.number}</PlayerNumber>
              <PlayerName>
                <PlayerLink
                  to={`/players/${item.id}`}
                  href={`/players/${item.id}`}
                  title={item.name}
                >
                  {item.name}
                </PlayerLink>
              </PlayerName>
            </Player>
          ))}
        </PlayersList>
      </Lineup>
    </div>
  );
}

MatchLineup.propTypes = {
  lineup: PropTypes.shape({
    localteam: PropTypes.arrayOf(PropTypes.object),
    visitorteam: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  substitutions: PropTypes.shape({
    localteam: PropTypes.arrayOf(PropTypes.object),
    visitorteam: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default memo(MatchLineup);
