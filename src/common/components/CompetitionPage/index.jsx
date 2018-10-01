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

class CompetitionPage extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    currentMatchday: PropTypes.number.isRequired,
    isStandingsInitialized: PropTypes.bool.isRequired,
    standingsTable: PropTypes.arrayOf(PropTypes.object).isRequired,
    standingsMatchday: PropTypes.string,
    fixturesDate: PropTypes.string,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    historyPush: PropTypes.func.isRequired,
  }

  static defaultProps = {
    standingsMatchday: null,
    fixturesDate: null,
  }

  handleDateFilterChange = (event) => {
    const {
      target: {
        value,
      },
    } = event;

    const {
      standingsMatchday,
    } = this.props;

    this.props.historyPush({
      search: stringify({
        standingsMatchday: standingsMatchday || undefined,
        fixturesDate: value === getFormattedDate()
          ? undefined
          : value,
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
    } = this.props;

    this.props.historyPush({
      search: stringify({
        standingsMatchday: parseInt(value, 10) === currentMatchday
          ? undefined
          : value,
        fixturesDate: !fixturesDate || fixturesDate === getFormattedDate()
          ? undefined
          : fixturesDate,
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
                  label="Matchday:"
                  className={styles.CompetitionInfo__filter}
                  value={standingsMatchday || currentMatchday}
                  options={Array.from({
                    length: currentMatchday,
                  }).map((item, index) => ({
                    value: index + 1,
                    label: index + 1,
                  }))}
                  onChange={this.handleTableMatchdayFilterChange}
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
