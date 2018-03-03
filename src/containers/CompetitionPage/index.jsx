import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringify, parse } from 'query-string';
import moment from 'moment';

import {
  getCompetition,
  getFixtures,
  getTable,
  getIsFixturesFetching,
} from 'selectors';

import {
  fetchTable,
  fetchFixtures,
} from 'actions';

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

class CompetitionPage extends Component {
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

    this.props.fetchTable({
      competitionId,
      matchday: tableMatchday,
    });

    this.props.fetchFixtures({
      competitionId,
      date: fixturesDate,
    });
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
      nextCompetitionId !== competitionId
        || tableMatchday !== nextTableMatchday
    ) {
      this.props.fetchTable({
        competitionId: nextCompetitionId,
        matchday: nextTableMatchday,
      });
    }

    if (
      nextCompetitionId !== competitionId
        || fixturesDate !== nextFixturesDate
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
        fixturesDate: event.target.value,
      }),
    });
  }

  handleTableMatchdayFilterChange = (event) => {
    this.props.history.push({
      search: stringify({
        fixturesDate: this.props.fixturesDate,
        tableMatchday: event.target.value,
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
              <Alert>:( There are no matches</Alert>
            )}

            {competitionFixtures.length > 0 && (
              <FixturesList fixtures={competitionFixtures} />
            )}
          </section>

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
        </AppPageContent>
      </AppPage>
    );
  }
}

const mapStateToProps = (state, {
  match: {
    params: {
      id,
    },
  },
  location: {
    search,
  },
}) => {
  const competitionId = parseInt(id, 10);
  const {
    caption: competitionName = '',
    currentMatchday: competitionMatchday = 0,
  } = getCompetition(state, competitionId) || {};

  const {
    fixturesDate,
    tableMatchday = competitionMatchday,
  } = parse(search);

  const fixturesDateValue = moment(fixturesDate || Date.now()).format('YYYY-MM-DD');

  return {
    competitionId,
    competitionName,
    fixturesDate: fixturesDateValue,
    competitionFixtures: getFixtures(state, {
      competitionId,
      date: fixturesDateValue,
    }),
    isFixturesFetching: getIsFixturesFetching(state),
    currentCompetitionMatchday: competitionMatchday,
    tableMatchday: parseInt(tableMatchday, 10),
    competitionTable: getTable(state, `${competitionId}-${tableMatchday}`),
  };
};

const actions = {
  fetchTable,
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(CompetitionPage);
