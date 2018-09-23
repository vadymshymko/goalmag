import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'components/Table';

import './SquadPlayersTable.scss';

export default class SquadPlayersTable extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    players: [],
  }

  state = {
    sortBy: null,
    ascendingSort: true,
  }

  setSortProp = (sortBy) => {
    this.setState(state => ({
      sortBy,
      ascendingSort: state.sortBy !== sortBy || !state.ascendingSort,
    }));
  }

  render() {
    const {
      players,
    } = this.props;

    return (
      <Table
        className="SquadPlayersTable"
        headings={[
          {
            key: 'name',
            label: 'Name',
          },
          {
            key: 'dateOfBirth',
            label: 'Date of Birth',
          },
          {
            key: 'nationality',
            label: 'Nationality',
          },
          {
            key: 'position',
            label: 'Position',
          },
        ]}
        rows={players}
        onRequestSort={this.setSortProp}
        sortBy={this.state.sortBy}
        ascendingSort={this.state.ascendingSort}
      />
    );
  }
}
