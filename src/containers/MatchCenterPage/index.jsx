import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringify, parse } from 'query-string';
import moment from 'moment';

import { fetchFixtures } from 'actions';

import {
  getCompetitions,
  getFixtures,
  getIsFixturesFetching,
} from 'selectors';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import MatchCenterCompetition from 'components/MatchCenterCompetition';
import Alert from 'components/Alert';
import Dropdown from 'components/Dropdown';
import DateInput from 'components/DateInput';

import './MatchCenterPage.scss';

class MatchCenterPage extends Component {
  static propTypes = {
    fetchFixtures: PropTypes.func.isRequired,
    searchParams: PropTypes.shape({
      competitionId: PropTypes.number,
      date: PropTypes.string,
    }).isRequired,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  componentDidMount() {
    this.props.fetchFixtures(this.props.searchParams);
  }

  componentWillReceiveProps(nextProps) {
    if (stringify(nextProps.searchParams) !== stringify(this.props.searchParams)) {
      this.props.fetchFixtures(nextProps.searchParams);
    }
  }

  getCompetitionFixtures = competitionId => (
    this.props.fixtures.filter(fixture => (
      fixture.competitionId === competitionId
    ))
  )

  handleCompetitionFilterChange = (event) => {
    this.props.history.push({
      search: stringify({
        ...this.props.searchParams,
        date: this.props.searchParams.date === moment(Date.now()).format('YYYY-MM-DD')
          ? undefined
          : this.props.searchParams.date,
        competitionId: event.target.value || undefined,
      }),
    });
  }

  handleDateFilterChange = (event) => {
    this.props.history.push({
      search: stringify({
        ...this.props.searchParams,
        competitionId: this.props.searchParams.competitionId || undefined,
        date: event.target.value === moment(Date.now()).format('YYYY-MM-DD')
          ? undefined
          : event.target.value,
      }),
    });
  }

  render() {
    const {
      competitions,
      fixtures,
      isFixturesFetching,
      searchParams: {
        competitionId,
        date,
      },
    } = this.props;

    const showEmptyMessage = (
      !isFixturesFetching
      && fixtures.length === 0
    );

    return (
      <AppPage
        title="Match Center"
        className="MatchCenterPage"
      >
        <AppPageHeader className="MatchCenterPage__header">
          <AppPageTitle className="MatchCenterPage__title">
            Match Center
          </AppPageTitle>

          <div className="MatchCenterPage__fixturesFilters">
            <Dropdown
              label="Competition:"
              className="MatchCenterPage__fixturesFilter"
              value={competitionId}
              options={[
                {
                  label: 'All',
                  value: '',
                },
                ...competitions.map(competition => ({
                  value: competition.id,
                  label: competition.caption,
                })),
              ]}
              onChange={this.handleCompetitionFilterChange}
            />

            <DateInput
              label="Date:"
              className="MatchCenterPage__fixturesFilter"
              value={moment(date || Date.now()).format('YYYY-MM-DD')}
              onChange={this.handleDateFilterChange}
            />
          </div>
        </AppPageHeader>

        <AppPageContent>
          <ul className="MatchCenterPage__competitionsList">
            {competitions.map((competition) => {
              const competitionFixtures = this.getCompetitionFixtures(competition.id);

              if (competitionFixtures.length === 0) {
                return null;
              }

              return (
                <li
                  className="MatchCenterPage__competitionsItem"
                  key={competition.id}
                >
                  <MatchCenterCompetition
                    competitionId={competition.id}
                    competitionName={competition.caption}
                    competitionFixtures={competitionFixtures}
                  />
                </li>
              );
            })}
          </ul>

          {showEmptyMessage && (
            <Alert>:( There are no games by selected date</Alert>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}

const mapStateToProps = (state, {
  location: {
    search,
  },
}) => {
  const {
    competitionId,
    date,
  } = parse(search);

  const searchParams = {
    competitionId: parseInt(competitionId || 0, 10),
    date: moment(date || Date.now()).format('YYYY-MM-DD'),
  };

  const competitions = getCompetitions(state);
  const fixtures = getFixtures(state, { ...searchParams });
  const isFixturesFetching = getIsFixturesFetching(state);

  return {
    searchParams,
    fixtures,
    isFixturesFetching,
    competitions,
  };
};

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
