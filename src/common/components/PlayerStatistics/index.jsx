import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import TableWrapper from 'components/TableWrapper';
import Icon from 'components/Icon';

import Table from './styles';

const STATISTICS_TYPES_TITLES = {
  club: 'Club National Leagues:',
  cups: 'Club National Cups:',
  clubIntl: 'Club Intl. Competitions:',
  national: 'National Team',
};

const TABLE_HEADERS = [
  { title: 'Season', content: 'Season' },
  { title: 'Team', content: 'Team' },
  { title: 'Competition', content: 'Competition' },
  { title: 'Matches', content: 'Matches' },
  { title: 'Goals', content: 'Goals' },
  { title: 'Assists', content: 'Assists' },
  {
    title: 'Yellow Cards',
    content: <Icon name="yellowCard" width="12" height="16" />,
  },
  {
    title: 'Red Cards',
    content: <Icon name="redCard" width="12" height="16" />,
  },
];

function PlayerStatistics({ statistics }) {
  const visiblePlayerStatisticsTypes = useMemo(() => {
    return Object.keys(statistics).reduce((result, item) => {
      if (!statistics[item].length) {
        return result;
      }

      return [...result, item];
    }, []);
  }, [statistics]);

  return (
    <div>
      {visiblePlayerStatisticsTypes.map(type => {
        return (
          <ContentSection key={type}>
            <ContentSectionTitle>
              {STATISTICS_TYPES_TITLES[type]}
            </ContentSectionTitle>

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
                  {statistics[type].map(stats => (
                    <tr key={`${stats.league}-${stats.season}`}>
                      <td>{stats.season}</td>

                      <td>
                        <Link to={`/teams/${stats.id}`}>{stats.name}</Link>
                      </td>

                      <td>{stats.league}</td>

                      <td>{stats.appearances}</td>

                      <td>{stats.goals}</td>

                      <td>{stats.assists}</td>

                      <td>{stats.yellowcards}</td>

                      <td>
                        {parseInt(stats.redcards || 0, 10) +
                          parseInt(stats.yellowred || 0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          </ContentSection>
        );
      })}
    </div>
  );
}

PlayerStatistics.propTypes = {
  statistics: PropTypes.objectOf(PropTypes.array),
};

PlayerStatistics.defaultProps = {
  statistics: {},
};

export default memo(PlayerStatistics);
