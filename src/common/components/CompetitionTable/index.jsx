import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Table from 'components/Table';
import TeamLink from 'components/TeamLink';

import styles from './CompetitionTable.scss';

class CompetitionTable extends Component {
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
        className={styles.CompetitionTable}
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
            key: 'points',
            label: 'P',
            style: {
              fontWeight: 500,
            },
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
            label: 'GF',
          },
          {
            key: 'goalsAgainst',
            label: 'GA',
          },
          {
            key: 'goalDifference',
            label: 'GD',
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
                  logoUrl={item.team.crestUrl}
                  renderEmptyLogo
                />
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

export default withStyles(styles)(CompetitionTable);
