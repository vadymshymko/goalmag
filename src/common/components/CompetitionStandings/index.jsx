import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import TableWrapper from 'components/TableWrapper';

import Table from './styles';

const TABLE_HEADERS = ['#', 'Team', 'Pl', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD'];

function CompetitionStandings({ standings }) {
  if (!Object.keys(standings).length) {
    return null;
  }

  return (
    <ContentSection>
      <ContentSectionTitle>Standings:</ContentSectionTitle>

      {Object.keys(standings).map(tableGroup => (
        <TableWrapper key={tableGroup}>
          <Table>
            <thead>
              <tr>
                {TABLE_HEADERS.map(head => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {standings[tableGroup].map(item => (
                <tr key={item.teamId}>
                  <td>{item.position}</td>

                  <td>
                    <Link
                      to={`/teams/${item.teamId}`}
                      href={`/teams/${item.teamId}`}
                      title={item.teamName}
                      style={{ position: 'relative' }}
                    >
                      {item.teamName}
                    </Link>
                  </td>
                  <td>{item.overallGp}</td>
                  <td>
                    <strong>{item.points}</strong>
                  </td>
                  <td>{item.overallW}</td>
                  <td>{item.overallD}</td>
                  <td>{item.overallL}</td>
                  <td>{item.overallGs}</td>
                  <td>{item.overallGa}</td>
                  <td>{item.gd}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      ))}
    </ContentSection>
  );
}

CompetitionStandings.propTypes = {
  standings: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default memo(CompetitionStandings);
