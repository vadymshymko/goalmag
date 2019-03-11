import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';

import styles from './Table.scss';

class Table extends Component {
  static propTypes = {
    className: PropTypes.string,
    headings: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
      style: PropTypes.object,
    })),
    rows: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    className: '',
    headings: [],
    rows: [],
  };

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

  getSortedRows = (rows, sortBy, ascendingSort) => {
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
  }

  render() {
    const {
      className,
      headings,
      rows,
    } = this.props;

    const { sortBy, ascendingSort } = this.state;

    return (
      <div className={styles.TableContainer}>
        <table className={`${styles.Table} ${className}`}>
          <thead>
            <tr>
              {headings.map(heading => (
                <th
                  key={heading.key}
                  onClick={() => { this.setSortProp(heading.key); }}
                >
                  <span className={styles.Table__heading}>
                    <Icon
                      viewBox="0 0 8 6"
                      className={styles.Table__sortIcon}
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
            {this.getSortedRows(rows, sortBy, ascendingSort).map(row => (
              <tr key={row.id}>
                {headings.map(heading => (
                  <td key={heading.key} style={heading.style}>
                    {row[heading.key] || row[heading.key] === 0
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
  }
}

export default withStyles(styles)(Table);
