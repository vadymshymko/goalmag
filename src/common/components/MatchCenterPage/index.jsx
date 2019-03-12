import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { getFormattedDate } from 'utils';

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
    competitionId: PropTypes.number,
    date: PropTypes.string,
    fixturesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    isFixturesInitialized: PropTypes.bool.isRequired,
    competitionsItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    competitionId: null,
    date: null,
  }

  componentDidMount() {
    const {
      competitionId,
      date,
      fetchData,
      dispatch,
    } = this.props;

    fetchData(dispatch, {
      competitionId,
      date,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      competitionId,
      date,
      fetchData,
      dispatch,
    } = this.props;

    const {
      competitionId: prevCompetition,
      date: prevDate,
    } = prevProps;

    if (
      competitionId !== prevCompetition
      || date !== prevDate
    ) {
      fetchData(dispatch, {
        competitionId,
        date,
      });
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

    const { date, history } = this.props;

    history.push({
      search: stringify({
        date: !date || date === getFormattedDate()
          ? undefined
          : date,
        competitionId: value || undefined,
      }),
    });
  }

  handleDateFilterChange = (event) => {
    const {
      value,
    } = event.target;

    const { competitionId, history } = this.props;

    history.push({
      search: stringify({
        competitionId: competitionId || undefined,
        date: value === getFormattedDate()
          ? undefined
          : value,
      }),
    });
  }

  render() {
    const {
      competitionsItems,
      competitionId,
      date,
      fixturesItems,
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
              label="Competition:"
              className={styles.MatchCenterPage__fixturesFilter}
              value={competitionId || ''}
              options={[
                {
                  label: 'All',
                  value: '',
                },
                ...competitionsItems.map(competition => ({
                  value: competition.id,
                  label: competition.name,
                })),
              ]}
              onChange={this.handleCompetitionFilterChange}
            />

            <DateInput
              fieldId="MatchCenterPageFixturesDateFilter"
              label="Date:"
              className={styles.MatchCenterPage__fixturesFilter}
              value={getFormattedDate(date)}
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
