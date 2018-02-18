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
  getCompetition,
  getIsFixturesFetching,
} from 'selectors';

import './MatchCenterPage.scss';

class MatchCenterPage extends Component {
  static propTypes = {
    fetchFixtures: PropTypes.func.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixtures: PropTypes.arrayOf(PropTypes.object).isRequired,
    fixturesCompetitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
    searchParams: PropTypes.shape({
      competitionId: PropTypes.string,
      date: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  componentDidMount() {
    const {
      competitionId,
      date,
    } = this.props.searchParams;

    this.props.fetchFixtures({
      competitionId: parseInt(competitionId, 10),
      date: moment(date || Date.now()).format('YYYY-MM-DD'),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (stringify(nextProps.searchParams) !== stringify(this.props.searchParams)) {
      const {
        competitionId,
        date,
      } = nextProps.searchParams;

      this.props.fetchFixtures({
        competitionId: parseInt(competitionId, 10),
        date,
      });
    }
  }

  getCompetitionFixtures = (fixtures, competitionId) => (
    fixtures.filter(fixture => (
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
      fixtures,
      fixturesCompetitions,
      isFixturesFetching,
      searchParams: {
        competitionId = '',
        date,
      },
    } = this.props;

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
              const competitionFixtures = this.getCompetitionFixtures(fixtures, competition.id);

              if (competitionFixtures.length === 0) {
                return null;
              }

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

          {!isFixturesFetching && fixtures.length === 0 && (
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
  const searchParams = { ...parse(search) };

  const fixtures = getFixtures(state);
  const competitions = getCompetitions(state);

  const fixturesCompetitionsIds = searchParams.competitionId
    ? [
      parseInt(searchParams.competitionId, 10),
    ]
    : [
      ...new Set(fixtures.map(fixture => (
        fixture.competitionId
      ))),
    ];

  const fixturesCompetitions = fixturesCompetitionsIds.map(id => (
    getCompetition(state, id)
  ));

  const fixturesToShow = fixtures.filter(item => (
    fixturesCompetitionsIds.indexOf(item.competitionId) >= 0
  ));

  return {
    fixtures: fixturesToShow,
    isFixturesFetching: getIsFixturesFetching(state),
    competitions,
    fixturesCompetitions,
    searchParams,
  };
};

const actions = {
  fetchFixtures,
};

export default connect(mapStateToProps, actions)(MatchCenterPage);
