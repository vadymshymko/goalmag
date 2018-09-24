import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import moment from 'moment';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import CompetitionTable from 'components/CompetitionTable';
import Alert from 'components/Alert';
import FixturesList from 'components/FixturesList';
import Dropdown from 'components/Dropdown';
import DateInput from 'components/DateInput';

import './CompetitionPage.scss';

export default class CompetitionPage extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    currentMatchday: PropTypes.number.isRequired,
    isStandingsInitialized: PropTypes.bool.isRequired,
    standingsTable: PropTypes.arrayOf(PropTypes.object).isRequired,
    standingsMatchday: PropTypes.number,
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

  getFormattedDate = (date = Date.now()) => (
    moment(date).format('YYYY-MM-DD')
  )

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
        fixturesDate: value === this.getFormattedDate()
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
        fixturesDate: fixturesDate === this.getFormattedDate()
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
        className="CompetitionPage"
      >
        <AppPageHeader>
          <AppPageTitle>
            {name}
          </AppPageTitle>
        </AppPageHeader>

        <AppPageContent>
          <section className="CompetitionInfo">
            <header className="CompetitionInfo__header">
              <h3 className="CompetitionInfo__title">Match Center:</h3>

              <DateInput
                fieldId="CompetitionInfoFixturesDateFilter"
                label="Date:"
                className="CompetitionInfo__filter"
                value={this.getFormattedDate(fixturesDate)}
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
            <section className="CompetitionInfo">
              <header className="CompetitionInfo__header">
                <h3 className="CompetitionInfo__title">Standings:</h3>

                <Dropdown
                  fieldId="CompetitionInfoTableMatchdayFilter"
                  label="Matchday:"
                  className="CompetitionInfo__filter"
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
