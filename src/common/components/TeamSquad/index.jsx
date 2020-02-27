import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import TableWrapper from 'components/TableWrapper';
import Icon from 'components/Icon';

import { Table, PlayerLink, PlayerName, PlayerLinkOverlay } from './styles';

const TABLE_HEADERS = [
  {
    title: '#',
    content: '#',
  },
  {
    title: 'Pos',
    content: 'Pos',
  },
  {
    title: 'Name',
    content: 'Name',
  },
  {
    title: 'Matches',
    content: 'Matches',
  },
  {
    title: 'Goals',
    content: 'Goals',
  },
  {
    title: 'Assists',
    content: 'Assists',
  },
  {
    title: 'Yellow Cards',
    content: <Icon name="yellowCard" width="20" height="15" />,
  },
  {
    title: 'Red Cards',
    content: <Icon name="redCard" width="20" height="15" />,
  },
];

function TeamInfo({ squad }) {
  return (
    <ContentSection>
      <ContentSectionTitle>Squad:</ContentSectionTitle>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {TABLE_HEADERS.map(head => (
                <th key={head.title}>{head.content}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {squad.map(player => (
              <tr key={player.id}>
                <td>{player.number}</td>

                <td>{player.position}</td>

                <td>
                  <PlayerLink
                    to={`/players/${player.id}`}
                    href={`/players/${player.id}`}
                    title={player.name}
                    style={{ position: 'relative' }}
                  >
                    <PlayerName>{player.name}</PlayerName>
                    <PlayerLinkOverlay />
                  </PlayerLink>
                </td>

                <td>{player.appearences}</td>

                <td>{player.goals}</td>

                <td>{player.assists}</td>

                <td>{player.yellowcards}</td>

                <td>
                  {parseInt(player.redcards, 10) +
                    parseInt(player.yellowred, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </ContentSection>
  );
}

TeamInfo.propTypes = {
  squad: PropTypes.arrayOf(PropTypes.object),
};

TeamInfo.defaultProps = {
  squad: [],
};

export default memo(TeamInfo);
