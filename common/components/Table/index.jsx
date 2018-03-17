import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import './Table.scss';

const getSortedRows = (rows, sortBy, ascendingSort) => {
  if (!sortBy) {
    return rows;
  }

  return [
    ...rows.sort((a, b) => {
      const first = ascendingSort
        ? a
        : b;
      const second = ascendingSort
        ? b
        : a;

      const firstValue = first[sortBy]
        ? first[sortBy].value || first[sortBy]
        : null;

      const secondValue = second[sortBy]
        ? second[sortBy].value || second[sortBy]
        : null;

      if (firstValue < secondValue) {
        return -1;
      } else if (firstValue > secondValue) {
        return 1;
      }

      return 0;
    }),
  ];
};

const Table = ({
  className,
  headings,
  onRequestSort,
  rows,
  sortBy,
  ascendingSort,
}) => (
  <div className="TableContainer">
    <table className={`Table ${className}`}>
      <thead>
        <tr>
          {headings.map(heading => (
            <th
              key={heading.key}
              onClick={() => { onRequestSort(heading.key); }}
            >
              <span className="Table__heading">
                <Icon
                  viewBox="0 0 8 6"
                  className="Table__sortIcon"
                >
                  {sortBy && ascendingSort ? (
                    <polygon
                      points="0,6 4,0 8,6"
                      style={{
                        fill: '#212529',
                        stroke: 'none',
                      }}
                    />
                  ) : (
                    <polygon
                      points="0,0 4,6 8,0"
                      style={{
                        fill: '#212529',
                        stroke: 'none',
                      }}
                    />
                  )}
                </Icon>

                {heading.label}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {getSortedRows(rows, sortBy, ascendingSort).map(row => (
          <tr key={row.id}>
            {headings.map(heading => (
              <td key={heading.key}>
                {row[heading.key]
                  ? row[heading.key].label || row[heading.key]
                  : null
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  className: PropTypes.string,
  headings: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.node,
  })),
  onRequestSort: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.string,
  ascendingSort: PropTypes.bool,
};

Table.defaultProps = {
  className: '',
  headings: [],
  onRequestSort: () => {},
  rows: [],
  sortBy: null,
  ascendingSort: false,
};

export default Table;
