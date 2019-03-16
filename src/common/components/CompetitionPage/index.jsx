import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { getFormattedDate } from 'utils';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import Alert from 'components/Alert';
import FixturesList from 'components/FixturesList';
import Dropdown from 'components/Dropdown';
import DateInput from 'components/DateInput';
import Table from 'components/Table';
import TeamLink from 'components/TeamLink';

import styles from './CompetitionPage.scss';

const STANDINGS_TYPES = [
  {
    value: 'total',
    label: 'Total',
  },
  {
    value: 'home',
    label: 'Home',
  },
  {
    value: 'away',
    label: 'Away',
  },
];

const STANDINGS_TYPES_REGEXP = /(home|away)/;

class CompetitionPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    standingsTable: PropTypes.arrayOf(PropTypes.object).isRequired,
    isStandingsInitialized: PropTypes.bool.isRequired,
    fixturesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixturesDate: PropTypes.string,
    standingsType: PropTypes.string,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    fixturesDate: null,
    standingsType: 'total',
  }

  componentDidMount() {
    const {
      id,
      fixturesDate,
      fetchData,
      dispatch,
    } = this.props;

    fetchData(dispatch, {
      id,
      fixturesDate,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      fixturesDate,
      fetchData,
      dispatch,
    } = this.props;

    const {
      id: prevId,
      fixturesDate: prevFixturesDate,
    } = prevProps;

    const isNewCompetition = id !== prevId;
    const isNewFixturesDate = fixturesDate !== prevFixturesDate;

    if (
      isNewCompetition
      || isNewFixturesDate
    ) {
      fetchData(dispatch, {
        id,
        fixturesDate,
      });
    }
  }

  handleDateFilterChange = (event) => {
    const {
      target: {
        value,
      },
    } = event;

    const {
      history,
      standingsType,
    } = this.props;

    history.push({
      search: stringify({
        fixturesDate: value === getFormattedDate()
          ? undefined
          : value,
        standingsType: STANDINGS_TYPES_REGEXP.test(standingsType) ? standingsType : undefined,
      }),
    });
  }

  handleTableStandingsTypeFilterChange = (event) => {
    const {
      target: {
        value,
      },
    } = event;

    const {
      fixturesDate,
      history,
    } = this.props;

    history.push({
      search: stringify({
        fixturesDate: !fixturesDate || fixturesDate === getFormattedDate()
          ? undefined
          : fixturesDate,
        standingsType: value === 'total' ? undefined : value,
      }),
    });
  }

  render() {
    const {
      name,
      fixturesDate,
      fixturesItems,
      isFixturesInitialized,
      standingsTable,
      standingsType,
      isFixturesFetching,
      isStandingsInitialized,
    } = this.props;

    return (
      <AppPage
        title={name}
        description={`Fixtures, teams, squads and standings - ${name}`}
        className={styles.CompetitionPage}
      >
        <AppPageHeader>
          <AppPageTitle>
            {name}
          </AppPageTitle>
        </AppPageHeader>

        <AppPageContent>
          <section className={styles.CompetitionInfo}>
            <header className={styles.CompetitionInfo__header}>
              <h3 className={styles.CompetitionInfo__title}>Match Center:</h3>

              <DateInput
                fieldId="CompetitionInfoFixturesDateFilter"
                className={styles.CompetitionInfo__filter}
                value={getFormattedDate(fixturesDate)}
                onChange={this.handleDateFilterChange}
              />
            </header>

            {isFixturesInitialized && !isFixturesFetching && fixturesItems.length === 0 && (
              <Alert>:( There are no games by selected date</Alert>
            )}

            {fixturesItems.length > 0 && (
              <FixturesList fixtures={fixturesItems} />
            )}
          </section>

          {isStandingsInitialized && (
            <section className={styles.CompetitionInfo}>
              <header className={styles.CompetitionInfo__header}>
                <h3 className={styles.CompetitionInfo__title}>Standings:</h3>

                <Dropdown
                  fieldId="CompetitionInfoTableMatchdayFilter"
                  className={styles.CompetitionInfo__filter}
                  value={standingsType || 'total'}
                  options={STANDINGS_TYPES}
                  onChange={this.handleTableStandingsTypeFilterChange}
                />
              </header>

              {standingsTable.map(({ type, group, table }) => (
                <Table
                  className={styles.CompetitionInfo__table}
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
                  key={`${type}-${group || ''}`}
                />
              ))}
            </section>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}

export default withStyles(styles)(CompetitionPage);
