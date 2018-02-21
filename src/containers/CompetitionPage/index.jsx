import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringify, parse } from 'query-string';
import moment from 'moment';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import CompetitionTable from 'components/CompetitionTable';
import Alert from 'components/Alert';
import FixturesList from 'components/FixturesList';
import FixturesDateFilter from 'components/FixturesDateFilter';
import TableMatchdayFilter from 'components/TableMatchdayFilter';

import {
  getCompetition,
  getTable,
  getFixtures,
  getIsFixturesFetching,
} from 'selectors';

import {
  fetchTable,
  fetchFixtures,
} from 'actions';

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

    if (!competitionId) {
      this.props.history.replace('/');
    } else {
      this.props.fetchTable({
        competitionId,
        matchday: tableMatchday,
      });

      this.props.fetchFixtures({
        competitionId,
        date: fixturesDate,
      });
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

    if (!nextCompetitionId) {
      this.props.history.replace('/');
    } else {
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
        || (
          fixturesDate !== nextFixturesDate
        )
      ) {
        this.props.fetchFixtures({
          competitionId: nextCompetitionId,
          date: nextFixturesDate,
        });
      }
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
          <div className="CompetitionInfo">
            <section className="CompetitionInfo__section">
              <h3 className="CompetitionInfo__title">Match Center:</h3>

              <FixturesDateFilter
                label="Date:"
                className="CompetitionInfo__fixturesFilter"
                value={fixturesDate}
                onChange={this.handleDateFilterChange}
              />

              {!isFixturesFetching && competitionFixtures.length === 0 && (
                <Alert>:( There are no matches</Alert>
              )}

              {competitionFixtures.length > 0 && (
                <FixturesList fixtures={competitionFixtures} />
              )}
            </section>

            <section className="CompetitionInfo__section">
              <h3 className="CompetitionInfo__title">Standings:</h3>

              <TableMatchdayFilter
                label="Matchday:"
                className="CompetitionInfo__fixturesFilter"
                value={tableMatchday}
                matchdays={Array.from({
                  length: currentCompetitionMatchday,
                }).map((item, index) => (
                  index + 1
                ))}
                onChange={this.handleTableMatchdayFilterChange}
              />

              <CompetitionTable standing={competitionTable.standing} />
            </section>
          </div>
        </AppPageContent>
      </AppPage>
    );
  }
}

const mapStateToProps = (state, {
  match: {
    params: {
      id: competitionId,
    },
  },
  location: {
    search,
  },
}) => {
  const {
    caption: competitionName,
    currentMatchday: competitionMatchday,
  } = getCompetition(state, competitionId);

  const {
    fixturesDate,
    tableMatchday = competitionMatchday,
  } = parse(search);

  const fixturesDateValue = moment(fixturesDate || Date.now()).format('YYYY-MM-DD');

  return {
    competitionId: parseInt(competitionId, 10),
    competitionName,
    currentCompetitionMatchday: competitionMatchday,
    competitionTable: getTable(state, `${competitionId}-${tableMatchday}`),
    competitionFixtures: getFixtures(state).filter(item => (
      parseInt(item.competitionId, 10) === parseInt(competitionId, 10)
      && moment(item.date).startOf('day').format('YYYY-MM-DD') === fixturesDateValue
    )),
    isFixturesFetching: getIsFixturesFetching(state),
    fixturesDate: fixturesDateValue,
    tableMatchday: parseInt(tableMatchday, 10),
  };
};

const actions = {
  fetchTable,
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(CompetitionPage);
