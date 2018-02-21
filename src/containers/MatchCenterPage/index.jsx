import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringify, parse } from 'query-string';
import moment from 'moment';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import MatchCenterCompetition from 'components/MatchCenterCompetition';
import Alert from 'components/Alert';
import FixturesDateFilter from 'components/FixturesDateFilter';
import FixturesCompetitionFilter from 'components/FixturesCompetitionFilter';

import { fetchFixtures } from 'actions';

import {
  getCompetitions,
  getFixtures,
  getIsFixturesFetching,
} from 'selectors';

import './MatchCenterPage.scss';

class MatchCenterPage extends Component {
  static propTypes = {
    fetchFixtures: PropTypes.func.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    searchParams: PropTypes.shape({
      competitionId: PropTypes.number,
      date: PropTypes.string,
    }).isRequired,
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

  getFixturesCompetitions = () => (
    this.props.competitions.filter(competition => (
      (
        !this.props.searchParams.competitionId
        || this.props.searchParams.competitionId === competition.id
      )
      && this.getCompetitionFixtures(competition.id).length > 0
    ))
  )

  getCompetitionFixtures = competitionId => (
    this.props.fixtures.filter(fixture => (
      fixture.competitionId === competitionId
    ))
  )

  handleCompetitionFilterChange = (event) => {
    this.props.history.push({
      search: stringify({
        ...this.props.searchParams,
        competitionId: event.target.value,
      }),
    });
  }

  handleDateFilterChange = (event) => {
    this.props.history.push({
      search: stringify({
        ...this.props.searchParams,
        date: event.target.value,
      }),
    });
  }

  render() {
    const {
      competitions,
      isFixturesFetching,
      searchParams: {
        competitionId,
        date,
      },
    } = this.props;

    const fixturesCompetitions = this.getFixturesCompetitions();
    const showEmptyMessage = (
      !isFixturesFetching
      && (
        competitionId
          ? this.getCompetitionFixtures(competitionId).length === 0
          : fixturesCompetitions.length === 0
      )
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
            <FixturesCompetitionFilter
              label="Competition:"
              className="MatchCenterPage__fixturesFilter"
              value={competitionId}
              competitions={competitions}
              onChange={this.handleCompetitionFilterChange}
            />

            <FixturesDateFilter
              label="Date:"
              className="MatchCenterPage__fixturesFilter"
              value={moment(date || Date.now()).format('YYYY-MM-DD')}
              onChange={this.handleDateFilterChange}
            />
          </div>
        </AppPageHeader>

        <AppPageContent>
          <ul className="MatchCenterPage__competitionsList">
            {fixturesCompetitions.map((competition) => {
              const competitionFixtures = this.getCompetitionFixtures(competition.id);

              return (
                <li
                  className="MatchCenterPage__competitionsItem"
                  key={competition.id}
                >
                  <MatchCenterCompetition
                    competitionName={competition.caption}
                    competitionFixtures={competitionFixtures}
                  />
                </li>
              );
            })}
          </ul>

          {showEmptyMessage && (
            <Alert>:( There are no matches</Alert>
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

  return {
    fixtures: getFixtures(state),
    isFixturesFetching: getIsFixturesFetching(state),
    competitions: getCompetitions(state),
    searchParams: {
      competitionId: parseInt(competitionId || 0, 10),
      date: moment(date || Date.now()).format('YYYY-MM-DD'),
    },
  };
};

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
