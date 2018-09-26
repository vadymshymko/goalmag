import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'components/Table';
import TeamLink from 'components/TeamLink';

import './CompetitionTable.scss';

export default class CompetitionTable extends Component {
  static propTypes = {
    table: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    table: [],
  }

  state = {
    sortBy: 'position',
    ascendingSort: true,
  }

  setSortProp = (sortBy) => {
    this.setState(state => ({
      sortBy,
      ascendingSort: state.sortBy !== sortBy || !state.ascendingSort,
    }));
  }

  render() {
    const { table } = this.props;

    return (
      <Table
        className="CompetitionTable"
        headings={[
          {
            key: 'position',
            label: '#',
          },
          {
            key: 'teamName',
            label: 'Team',
          },
          {
            key: 'playedGames',
            label: 'Pl',
          },
          {
            key: 'won',
            label: 'W',
          },
          {
            key: 'draw',
            label: 'D',
          },
          {
            key: 'lost',
            label: 'L',
          },
          {
            key: 'goalsFor',
            label: 'F',
          },
          {
            key: 'goalsAgainst',
            label: 'A',
          },
          {
            key: 'goalDifference',
            label: 'GD',
          },
          {
            key: 'points',
            label: 'Pts',
          },
        ]}
        rows={[
          ...table.map(item => ({
            ...item,
            id: item.team.id,
            teamName: {
              label: (
                <TeamLink
                  id={item.team.id}
                  name={item.team.name}
                >
                  {item.team.name}
                </TeamLink>
              ),
              value: item.teamName,
            },
          })),
        ]}
        onRequestSort={this.setSortProp}
        sortBy={this.state.sortBy}
        ascendingSort={this.state.ascendingSort}
      />
    );
  }
}
