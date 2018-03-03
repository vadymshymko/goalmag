import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'components/Table';

import './SquadTable.scss';

export default class SquadTable extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    players: [],
  }

  state = {
    sortBy: 'jerseyNumber',
    ascendingSort: true,
  }

  setSortProp = (sortBy) => {
    this.setState(state => ({
      sortBy,
      ascendingSort: state.sortBy !== sortBy || !state.ascendingSort,
    }));
  }

  render() {
    return (
      <Table
        className="SquadTable"
        headings={[
          {
            key: 'jerseyNumber',
            label: '№',
          },
          {
            key: 'name',
            label: 'Name',
          },
          {
            key: 'position',
            label: 'Position',
          },
          {
            key: 'dateOfBirth',
            label: 'Date of Birth',
          },
          {
            key: 'contractUntil',
            label: 'Contract Until',
          },
          {
            key: 'nationality',
            label: 'Nationality',
          },
        ]}
        rows={this.props.players}
        onRequestSort={this.setSortProp}
        sortBy={this.state.sortBy}
        ascendingSort={this.state.ascendingSort}
      />
    );
  }
}
