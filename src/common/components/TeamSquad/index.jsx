import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import TableWrapper from 'components/TableWrapper';
import Icon from 'components/Icon';

import Table from './styles';

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
    content: <Icon name="yellowCard" width="12" height="16" />,
  },
  {
    title: 'Red Cards',
    content: <Icon name="redCard" width="12" height="16" />,
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
                  <Link
                    to={`/players/${player.id}`}
                    href={`/players/${player.id}`}
                    title={player.name}
                    style={{ position: 'relative' }}
                  >
                    {player.name}
                  </Link>
                </td>

                <td>{player.appearences}</td>

                <td>{player.goals}</td>

                <td>{player.assists}</td>

                <td>{player.yellowcards}</td>

                <td>
                  {parseInt(player.redcards || 0, 10) +
                    parseInt(player.yellowred || 0, 10)}
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
