import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContentSection from 'components/ContentSection';
import ContentSectionTitle from 'components/ContentSectionTitle';

import { StyledTableWrapper, StyledTable, Status, FormIcon } from './styles';

const TABLE_HEADERS = [
  {
    title: '#',
    content: '#',
  },
  {
    title: 'status',
    content: '',
  },
  {
    title: 'Team',
    content: 'Team',
  },
  {
    title: 'Pl',
    content: 'Pl',
  },
  {
    title: 'P',
    content: 'P',
  },
  {
    title: 'W',
    content: 'W',
  },
  {
    title: 'D',
    content: 'D',
  },
  {
    title: 'L',
    content: 'L',
  },
  {
    title: 'GF',
    content: 'GF',
  },
  {
    title: 'GA',
    content: 'GA',
  },
  {
    title: 'GD',
    content: 'GD',
  },
  {
    title: 'Form',
    content: 'Form',
  },
];

const FORM_CONFIG = {
  w: {
    title: 'Win',
    id: 'w',
  },
  l: {
    title: 'Loss',
    id: 'l',
  },
  d: {
    title: 'Draw',
    id: 'd',
  },
};

function CompetitionStandings({ standings }) {
  if (!Object.keys(standings).length) {
    return null;
  }

  return (
    <ContentSection>
      <ContentSectionTitle>Standings:</ContentSectionTitle>

      {Object.keys(standings).map(tableGroup => (
        <StyledTableWrapper key={tableGroup}>
          <StyledTable>
            <thead>
              <tr>
                {TABLE_HEADERS.map(head => (
                  <th key={head.title}>{head.content}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {standings[tableGroup].map(item => (
                <tr key={item.teamId}>
                  <td>{item.position}</td>

                  <td>
                    <Status className={item.status} />
                  </td>

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
                  <td>
                    {(item.recentForm || '')
                      .split('')
                      .map((recentFormValue, recentFormIndex) => (
                        <FormIcon
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${recentFormValue}-${recentFormIndex}`}
                          className={`form-${
                            FORM_CONFIG[recentFormValue.toLowerCase()].id
                          }`}
                          title={
                            FORM_CONFIG[recentFormValue.toLowerCase()].title
                          }
                        />
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </StyledTableWrapper>
      ))}
    </ContentSection>
  );
}

CompetitionStandings.propTypes = {
  standings: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default memo(CompetitionStandings);
