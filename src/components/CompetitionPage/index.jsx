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
    fetchTable: PropTypes.func.isRequired,
    fetchFixtures: PropTypes.func.isRequired,
    competitionId: PropTypes.number.isRequired,
    competitionName: PropTypes.string,
    competitionTable: PropTypes.shape({
      isInitialized: PropTypes.bool,
      standing: PropTypes.array,
    }),
    competitionFixtures: PropTypes.arrayOf(PropTypes.object),
    currentCompetitionMatchday: PropTypes.number,
    history: PropTypes.shape({
      replace: PropTypes.func,
      push: PropTypes.func,
    }).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    fixturesDate: PropTypes.string.isRequired,
    tableMatchday: PropTypes.number.isRequired,
  }

  static defaultProps = {
    competitionName: '',
    competitionTable: {},
    competitionFixtures: [],
    currentCompetitionMatchday: 0,
  }

  componentDidMount() {
    const {
      competitionId,
      fixturesDate,
      tableMatchday,
    } = this.props;

    if (competitionId) {
      if (tableMatchday) {
        this.props.fetchTable({
          competitionId,
          matchday: tableMatchday,
        });
      }

      if (fixturesDate) {
        this.props.fetchFixtures({
          competitionId,
          date: fixturesDate,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      competitionId,
      fixturesDate,
      tableMatchday,
    } = this.props;

    const {
      competitionId: nextCompetitionId,
      fixturesDate: nextFixturesDate,
      tableMatchday: nextTableMatchday,
    } = nextProps;

    if (
      (
        nextCompetitionId !== competitionId
        || tableMatchday !== nextTableMatchday
      )
      && !!nextCompetitionId
      && !!nextTableMatchday
    ) {
      this.props.fetchTable({
        competitionId: nextCompetitionId,
        matchday: nextTableMatchday,
      });
    }

    if (
      (
        nextCompetitionId !== competitionId
        || fixturesDate !== nextFixturesDate
      )
      && !!nextCompetitionId
      && !!nextFixturesDate
    ) {
      this.props.fetchFixtures({
        competitionId: nextCompetitionId,
        date: nextFixturesDate,
      });
    }
  }

  handleDateFilterChange = (event) => {
    this.props.history.push({
      search: stringify({
        tableMatchday: this.props.tableMatchday === this.props.currentCompetitionMatchday
          ? undefined
          : this.props.tableMatchday,
        fixturesDate: event.target.value === moment(Date.now()).format('YYYY-MM-DD')
          ? undefined
          : event.target.value,
      }),
    });
  }

  handleTableMatchdayFilterChange = (event) => {
    this.props.history.push({
      search: stringify({
        fixturesDate: this.props.fixturesDate === moment(Date.now()).format('YYYY-MM-DD')
          ? undefined
          : this.props.fixturesDate,
        tableMatchday: parseInt(event.target.value, 10) === this.props.currentCompetitionMatchday
          ? undefined
          : event.target.value,
      }),
    });
  }

  render() {
    const {
      competitionName,
      currentCompetitionMatchday,
      competitionTable,
      competitionFixtures,
      isFixturesFetching,
      fixturesDate,
      tableMatchday,
    } = this.props;

    return (
      <AppPage
        title={competitionName}
        className="CompetitionPage"
      >
        <AppPageHeader>
          <AppPageTitle>
            {competitionName}
          </AppPageTitle>
        </AppPageHeader>

        <AppPageContent>
          <section className="CompetitionInfo">
            <header className="CompetitionInfo__header">
              <h3 className="CompetitionInfo__title">Match Center:</h3>

              <DateInput
                label="Date:"
                className="CompetitionInfo__filter"
                value={fixturesDate}
                onChange={this.handleDateFilterChange}
              />
            </header>

            {!isFixturesFetching && competitionFixtures.length === 0 && (
              <Alert>:( There are no games by selected date</Alert>
            )}

            {competitionFixtures.length > 0 && (
              <FixturesList fixtures={competitionFixtures} />
            )}
          </section>

          {competitionTable.standing && competitionTable.standing.length > 0 && (
            <section className="CompetitionInfo">
              <header className="CompetitionInfo__header">
                <h3 className="CompetitionInfo__title">Standings:</h3>

                <Dropdown
                  label="Matchday:"
                  className="CompetitionInfo__filter"
                  value={tableMatchday}
                  options={Array.from({
                    length: currentCompetitionMatchday,
                  }).map((item, index) => ({
                    value: index + 1,
                    label: index + 1,
                  }))}
                  onChange={this.handleTableMatchdayFilterChange}
                />
              </header>

              <CompetitionTable standing={competitionTable.standing} />
            </section>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}
