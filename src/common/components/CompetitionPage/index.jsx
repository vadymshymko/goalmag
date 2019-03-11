import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { getFormattedDate } from 'utils';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import CompetitionTable from 'components/CompetitionTable';
import Alert from 'components/Alert';
import FixturesList from 'components/FixturesList';
import Dropdown from 'components/Dropdown';
import DateInput from 'components/DateInput';

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
    currentMatchday: PropTypes.number.isRequired,
    standingsTable: PropTypes.arrayOf(PropTypes.object).isRequired,
    standingsMatchday: PropTypes.string,
    isStandingsInitialized: PropTypes.bool.isRequired,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixturesDate: PropTypes.string,
    standingsType: PropTypes.string,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    standingsMatchday: null,
    fixturesDate: null,
    standingsType: 'total',
  }

  componentDidMount() {
    const {
      id,
      fixturesDate,
      standingsMatchday,
      fetchData,
      dispatch,
    } = this.props;

    fetchData(dispatch, {
      id,
      fixturesDate,
      standingsMatchday,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      fixturesDate,
      standingsMatchday,
      fetchData,
      dispatch,
    } = this.props;

    const {
      id: prevId,
      fixturesDate: prevFixturesDate,
      standingsMatchday: prevStandingsMatchday,
    } = prevProps;

    const isNewCompetition = id !== prevId;
    const isNewFixturesDate = fixturesDate !== prevFixturesDate;
    const isNewStandingsMatchday = standingsMatchday !== prevStandingsMatchday;

    if (
      isNewCompetition
      || isNewStandingsMatchday
      || isNewFixturesDate
    ) {
      fetchData(dispatch, {
        id,
        fixturesDate,
        standingsMatchday,
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
      standingsMatchday,
      history,
      standingsType,
    } = this.props;

    history.push({
      search: stringify({
        standingsMatchday: standingsMatchday || undefined,
        fixturesDate: value === getFormattedDate()
          ? undefined
          : value,
        standingsType: STANDINGS_TYPES_REGEXP.test(standingsType) ? standingsType : undefined,
      }),
    });
  }

  handleTableMatchdayFilterChange = (event) => {
    const {
      target: {
        value,
      },
    } = event;

    const {
      fixturesDate,
      currentMatchday,
      history,
      standingsType,
    } = this.props;

    history.push({
      search: stringify({
        standingsMatchday: parseInt(value, 10) === currentMatchday
          ? undefined
          : value,
        fixturesDate: !fixturesDate || fixturesDate === getFormattedDate()
          ? undefined
          : fixturesDate,
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
      standingsMatchday,
    } = this.props;

    history.push({
      search: stringify({
        standingsMatchday: standingsMatchday || undefined,
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
      currentMatchday,
      fixturesDate,
      fixtures,
      isFixturesInitialized,
      standingsTable,
      standingsMatchday,
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
                label="Date:"
                className={styles.CompetitionInfo__filter}
                value={getFormattedDate(fixturesDate)}
                onChange={this.handleDateFilterChange}
              />
            </header>

            {isFixturesInitialized && !isFixturesFetching && fixtures.length === 0 && (
              <Alert>:( There are no games by selected date</Alert>
            )}

            {fixtures.length > 0 && (
              <FixturesList fixtures={fixtures} />
            )}
          </section>

          {isStandingsInitialized && (
            <section className={styles.CompetitionInfo}>
              <header className={styles.CompetitionInfo__header}>
                <h3 className={styles.CompetitionInfo__title}>Standings:</h3>

                <Dropdown
                  fieldId="CompetitionInfoTableMatchdayFilter"
                  className={styles.CompetitionInfo__filter}
                  label="Matchday:"
                  value={standingsMatchday || currentMatchday}
                  options={Array.from({
                    length: currentMatchday,
                  }).map((item, index) => ({
                    value: index + 1,
                    label: index === currentMatchday - 1 ? 'All' : index + 1,
                  }))}
                  onChange={this.handleTableMatchdayFilterChange}
                />

                <Dropdown
                  fieldId="CompetitionInfoTableMatchdayFilter"
                  className={styles.CompetitionInfo__filter}
                  label="Type:"
                  value={standingsType || 'total'}
                  options={STANDINGS_TYPES}
                  onChange={this.handleTableStandingsTypeFilterChange}
                />
              </header>

              <CompetitionTable table={standingsTable} />
            </section>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}

export default withStyles(styles)(CompetitionPage);
