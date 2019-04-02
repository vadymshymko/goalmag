import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import MatchCenterCompetition from 'components/MatchCenterCompetition';
import Alert from 'components/Alert';
import Dropdown from 'components/Dropdown';
import DateInput from 'components/DateInput';

import styles from './MatchCenterPage.scss';

class MatchCenterPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    competitionId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    fixturesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixturesStatusesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    isAllFixturesFinished: PropTypes.bool.isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    competitionsItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.updateTimeout = null;
  }

  componentDidMount() {
    this.updateFixtures();
  }

  componentDidUpdate(prevProps) {
    const {
      date,
    } = this.props;

    const {
      date: prevDate,
    } = prevProps;

    if (date !== prevDate) {
      this.updateFixtures();
    }
  }

  getFixturesGroupedByCompetitionId = (fixtures = []) => (
    fixtures.reduce((result, {
      competition: {
        id: competitionId,
        name: competitionName,
      },
      ...item
    }) => ({
      ...result,
      [competitionId]: {
        id: competitionId,
        name: competitionName,
        fixtures: [
          ...((result[competitionId] || {}).fixtures || []),
          {
            competition: {
              id: competitionId,
              name: competitionName,
            },
            ...item,
          },
        ],
      },
    }), {})
  )

  getCompetitionFixtures = competitionId => (
    this.props.fixturesItems.filter(fixture => (
      fixture.competition.id === competitionId
    ))
  )

  handleCompetitionFilterChange = (event) => {
    const {
      value,
    } = event.target;

    this.updateFiltersState({
      competitionId: value || undefined,
    });
  }

  handleStatusFilterChange = (event) => {
    const {
      value,
    } = event.target;

    this.updateFiltersState({
      status: value || undefined,
    });
  }

  handleDateFilterChange = (event) => {
    const {
      value,
    } = event.target;

    this.updateFiltersState({
      date: value,
    });
  }

  updateFiltersState = (newState) => {
    const {
      history, competitionId, status, date,
    } = this.props;

    history.push({
      search: stringify({
        competitionId: competitionId || undefined,
        status: status || undefined,
        date,
        ...newState,
      }),
    });
  }

  updateFixtures = () => {
    const {
      isAllFixturesFinished,
      competitionId,
      date,
      fetchData,
      dispatch,
    } = this.props;

    clearTimeout(this.updateTimeout);

    if (!isAllFixturesFinished) {
      fetchData(dispatch, {
        competitionId,
        date,
      });

      this.updateTimeout = setTimeout(this.updateFixtures, 60000);
    }
  }

  render() {
    const {
      competitionsItems,
      competitionId,
      date,
      status,
      fixturesItems,
      fixturesStatusesItems,
      isFixturesFetching,
      isFixturesInitialized,
    } = this.props;

    const fixturesGroupedByCompetitionId = this.getFixturesGroupedByCompetitionId(fixturesItems);

    const showEmptyMessage = (
      isFixturesInitialized
      && !isFixturesFetching
      && fixturesItems.length === 0
    );

    return (
      <AppPage
        title="Match Center"
        description="Live fixtures across all competitions && dates - Goal Magazine"
        className={styles.MatchCenterPage}
      >
        <AppPageHeader className={styles.MatchCenterPage__header}>
          <AppPageTitle className={styles.MatchCenterPage__title}>
            Match Center
          </AppPageTitle>

          <div className={styles.MatchCenterPage__fixturesFilters}>
            <Dropdown
              fieldId="MatchCenterPageCompetitionFilter"
              className={styles.MatchCenterPage__fixturesFilter}
              value={competitionId}
              options={[
                {
                  label: 'All Competitions',
                  value: '',
                },
                ...competitionsItems.map(competition => ({
                  value: competition.id,
                  label: competition.name,
                })),
              ]}
              onChange={this.handleCompetitionFilterChange}
            />

            <Dropdown
              fieldId="MatchCenterPageStatusFilter"
              className={styles.MatchCenterPage__fixturesFilter}
              value={status}
              options={[
                {
                  label: 'All statuses',
                  value: '',
                },
                ...fixturesStatusesItems,
              ]}
              onChange={this.handleStatusFilterChange}
            />

            <DateInput
              fieldId="MatchCenterPageFixturesDateFilter"
              className={styles.MatchCenterPage__fixturesFilter}
              value={date}
              onChange={this.handleDateFilterChange}
            />
          </div>
        </AppPageHeader>

        <AppPageContent>
          {showEmptyMessage ? (
            <Alert>:( There are no games by selected date</Alert>
          ) : (
            <ul className={styles.MatchCenterPage__competitionsList}>
              {Object.keys(fixturesGroupedByCompetitionId).map(id => (
                <li
                  className={styles.MatchCenterPage__competitionsItem}
                  key={id}
                >
                  <MatchCenterCompetition
                    id={id}
                    name={fixturesGroupedByCompetitionId[id].name}
                    fixtures={fixturesGroupedByCompetitionId[id].fixtures}
                  />
                </li>
              ))}
            </ul>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}

export default withStyles(styles)(MatchCenterPage);
