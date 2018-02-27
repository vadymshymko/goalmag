import React from 'react';
import PropTypes from 'prop-types';

import './SquadTable.scss';

const SquadTable = ({ players }) => (
  <table className="SquadTable">
    <thead>
      <tr>
        <th>№</th>

        <th>Name</th>

        <th>Position</th>

        <th>Date of Birth</th>

        <th>Contract Until</th>

        <th>Nationality</th>
      </tr>
    </thead>

    <tbody>
      {[...players].sort((a, b) => (
        a.jerseyNumber - b.jerseyNumber
      )).map(item => (
        <tr key={item.id}>
          <td>{item.jerseyNumber}</td>

          <td>{item.name}</td>

          <td>{item.position}</td>

          <td>{item.dateOfBirth}</td>

          <td>{item.contractUntil}</td>

          <td>{item.nationality}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

SquadTable.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
};

SquadTable.defaultProps = {
  players: [],
};

export default SquadTable;
