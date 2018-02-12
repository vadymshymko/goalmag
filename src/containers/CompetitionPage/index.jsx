import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import CompetitionTable from 'components/CompetitionTable';

import { getCompetition, getTable } from 'selectors';

import { fetchTable } from 'actions';

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
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    competitionName: '',
    competitionMatchday: null,
    competitionTable: {},
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
    } = this.props;

    return (
      <AppPage title={competitionName}>
        <AppPageTitle>
          {competitionName}
        </AppPageTitle>

        <AppPageContent>
          <CompetitionTable standing={competitionTable.standing} />
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

  const competitionTableId = `${competitionId}-${competitionMatchday}`;
  const competitionTable = getTable(state, competitionTableId);

  return {
    competitionId: parseInt(competitionId, 10),
    competitionName,
    competitionMatchday,
    competitionTable,
  };
};

const actions = {
  fetchTable,
};

export default connect(mapStateToProps, actions)(CompetitionPage);
