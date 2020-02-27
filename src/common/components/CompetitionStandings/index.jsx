import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { getCompetitionStandingsTable } from 'selectors';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';
import TableWrapper from 'components/TableWrapper';

import { Table, TeamLink, TeamName, TeamLinkOverlay } from './styles';

const TABLE_HEADERS = ['#', 'Team', 'Pl', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD'];

function CompetitionStandings() {
  const location = useLocation();
  const routerMatch = useRouteMatch();

  const standingsTable = useSelector(state =>
    getCompetitionStandingsTable(state, {
      location,
      match: routerMatch,
    })
  );

  return (
    <ContentSection>
      <ContentSectionTitle>Standings:</ContentSectionTitle>

      <TableWrapper>
        {Object.keys(standingsTable).map(tableGroup => (
          <Table key={tableGroup}>
            <thead>
              <tr>
                {TABLE_HEADERS.map(head => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {standingsTable[tableGroup].map(item => (
                <tr key={item.teamId}>
                  <td>{item.position}</td>

                  <td>
                    <TeamLink
                      to={`/teams/${item.teamId}`}
                      href={`/teams/${item.teamId}`}
                      title={item.teamName}
                      style={{ position: 'relative' }}
                    >
                      <TeamName>{item.teamName}</TeamName>
                      <TeamLinkOverlay />
                    </TeamLink>
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
        ))}
      </TableWrapper>
    </ContentSection>
  );
}

export default CompetitionStandings;
