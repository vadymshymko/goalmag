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
    fetchStandings: PropTypes.func.isRequired,
    fetchFixtures: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    standings: PropTypes.shape({
      isInitialized: PropTypes.bool,
      standing: PropTypes.array,
    }),
    fixtures: PropTypes.arrayOf(PropTypes.object),
    currentMatchday: PropTypes.number,
    history: PropTypes.shape({
      replace: PropTypes.func,
      push: PropTypes.func,
    }).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    fixturesDate: PropTypes.string.isRequired,
    standingsMatchday: PropTypes.number.isRequired,
  }

  static defaultProps = {
    name: '',
    standings: {},
    fixtures: [],
    currentMatchday: 0,
  }

  componentDidMount() {
    const {
      id,
      fixturesDate,
      standingsMatchday,
    } = this.props;

    if (standingsMatchday) {
      this.props.fetchStandings({
        id,
        matchday: standingsMatchday,
      });
    }

    if (fixturesDate) {
      this.props.fetchFixtures({
        competitionId: id,
        date: fixturesDate,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      id,
      fixturesDate,
      standingsMatchday,
    } = this.props;

    const {
      id: nextId,
      fixturesDate: nextFixturesDate,
      standingsMatchday: nextStandingsMatchday,
    } = nextProps;

    if (
      (
        nextId !== id
        || standingsMatchday !== nextStandingsMatchday
      )
      && !!nextId
      && !!nextStandingsMatchday
    ) {
      this.props.fetchStandings({
        competitionId: nextId,
        matchday: nextStandingsMatchday,
      });
    }

    if (
      (
        nextId !== id
        || fixturesDate !== nextFixturesDate
      )
      && !!nextId
      && !!nextFixturesDate
    ) {
      this.props.fetchFixtures({
        competitionId: nextId,
        date: nextFixturesDate,
      });
    }
  }

  handleDateFilterChange = (event) => {
    const {
      target: {
        value: fixturesDate,
      },
    } = event;

    const {
      standingsMatchday,
      currentMatchday,
    } = this.props;

    this.props.history.push({
      search: stringify({
        standingsMatchday: standingsMatchday === currentMatchday
          ? undefined
          : standingsMatchday,
        fixturesDate: fixturesDate === moment(Date.now()).format('YYYY-MM-DD')
          ? undefined
          : fixturesDate,
      }),
    });
  }

  handleTableMatchdayFilterChange = (event) => {
    const {
      target: {
        value: standingsMatchday,
      },
    } = event;

    const {
      fixturesDate,
      currentMatchday,
    } = this.props;

    this.props.history.push({
      search: stringify({
        fixturesDate: fixturesDate === moment(Date.now()).format('YYYY-MM-DD')
          ? undefined
          : fixturesDate,
        standingsMatchday: parseInt(standingsMatchday, 10) === currentMatchday
          ? undefined
          : standingsMatchday,
      }),
    });
  }

  render() {
    const {
      name,
      currentMatchday,
      standings,
      fixtures,
      isFixturesFetching,
      fixturesDate,
      standingsMatchday,
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
                value={fixturesDate}
                onChange={this.handleDateFilterChange}
              />
            </header>

            {!isFixturesFetching && fixtures.length === 0 && (
              <Alert>:( There are no games by selected date</Alert>
            )}

            {fixtures.length > 0 && (
              <FixturesList fixtures={fixtures} />
            )}
          </section>

          {/* {table.standing && table.standing.length > 0 && (
            <section className="CompetitionInfo">
              <header className="CompetitionInfo__header">
                <h3 className="CompetitionInfo__title">Standings:</h3>

                <Dropdown
                  fieldId="CompetitionInfoTableMatchdayFilter"
                  label="Matchday:"
                  className="CompetitionInfo__filter"
                  value={standingsMatchday}
                  options={Array.from({
                    length: currentMatchday,
                  }).map((item, index) => ({
                    value: index + 1,
                    label: index + 1,
                  }))}
                  onChange={this.handleTableMatchdayFilterChange}
                />
              </header>

              <CompetitionTable standing={table.standing} />
            </section>
          )} */}
        </AppPageContent>
      </AppPage>
    );
  }
}
