import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import CompetitionTable from 'components/CompetitionTable';
import Alert from 'components/Alert';
import FixturesList from 'components/FixturesList';

import {
  getCompetition,
  getTable,
  getFixtures,
  getIsFixturesFetching,
} from 'selectors';

import { fetchTable } from 'actions';

import './CompetitionPage.scss';

class CompetitionPage extends Component {
  static propTypes = {
    fetchTable: PropTypes.func.isRequired,
    competitionId: PropTypes.number.isRequired,
    competitionMatchday: PropTypes.number,
    competitionName: PropTypes.string,
    competitionTable: PropTypes.shape({
      isInitialized: PropTypes.bool,
      standing: PropTypes.array,
    }),
    competitionFixtures: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    isFixturesFetching: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    competitionName: '',
    competitionMatchday: null,
    competitionTable: {},
    competitionFixtures: [],
  }

  componentDidMount() {
    const {
      competitionId,
      competitionMatchday,
    } = this.props;

    if (!competitionId) {
      this.props.history.replace('/');
    } else {
      this.props.fetchTable({
        competitionId,
        matchday: competitionMatchday,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      competitionId,
      competitionMatchday,
    } = this.props;

    const {
      competitionId: nextCompetitionId,
      competitionMatchday: nextCompetitionMatchday,
    } = nextProps;

    if (!nextCompetitionId) {
      this.props.history.replace('/');
    } else if (
      nextCompetitionId !== competitionId
      || competitionMatchday !== nextCompetitionMatchday
    ) {
      this.props.fetchTable({
        competitionId: nextCompetitionId,
        matchday: nextCompetitionMatchday,
      });
    }
  }

  render() {
    const {
      competitionName,
      competitionTable,
      competitionFixtures,
      isFixturesFetching,
    } = this.props;

    return (
      <AppPage
        title={competitionName}
        className="CompetitionPage"
      >
        <AppPageHeader>
          <AppPageTitle>
            CompetitionPage
          </AppPageTitle>
        </AppPageHeader>

        <AppPageContent>
          <div className="CompetitionInfo">
            <section className="CompetitionInfo__section">
              <h3 className="CompetitionInfo__title">Match Center:</h3>

              {!isFixturesFetching && competitionFixtures.length === 0 && (
                <Alert>:( There are no matches</Alert>
              )}

              {competitionFixtures.length > 0 && (
                <FixturesList fixtures={competitionFixtures} />
              )}
            </section>

            <section className="CompetitionInfo__section">
              <h3 className="CompetitionInfo__title">Standings:</h3>

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
}) => {
  const {
    caption: competitionName,
    currentMatchday: competitionMatchday,
  } = getCompetition(state, competitionId);

  return {
    competitionId: parseInt(competitionId, 10),
    competitionName,
    competitionMatchday,
    competitionTable: getTable(state, `${competitionId}-${competitionMatchday}`),
    competitionFixtures: getFixtures(state).filter(item => (
      parseInt(item.competitionId, 10) === parseInt(competitionId, 10)
    )),
    isFixturesFetching: getIsFixturesFetching(state),
  };
};

const actions = {
  fetchTable,
};

export default connect(mapStateToProps, actions)(CompetitionPage);
