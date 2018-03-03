import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'components/Table';
import TeamLink from 'components/TeamLink';

import './CompetitionTable.scss';

export default class CompetitionTable extends Component {
  static propTypes = {
    standing: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    standing: [],
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
    const { standing } = this.props;

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
            key: 'wins',
            label: 'W',
          },
          {
            key: 'draws',
            label: 'D',
          },
          {
            key: 'losses',
            label: 'L',
          },
          {
            key: 'goals',
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
          ...standing.map((item, index) => ({
            ...item,
            id: index,
            teamName: {
              label: (
                <TeamLink
                  id={parseInt(item.links.team.href.substr(item.links.team.href.lastIndexOf('/') + 1), 10)}
                  name={item.teamName}
                >
                  {item.teamName}
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
