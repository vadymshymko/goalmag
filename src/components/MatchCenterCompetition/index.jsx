import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCompetitionInfo } from 'selectors';

import FixturesList from 'components/FixturesList';

import './MatchCenterCompetition.scss';

class MatchCenterCompetition extends Component {
  static propTypes = {
    competitionInfo: PropTypes.shape({
      caption: PropTypes.string,
    }).isRequired,
    fixturesItems: PropTypes.arrayOf(PropTypes.shape({
      awayTeamName: PropTypes.string,
      homeTeamName: PropTypes.string,
      date: PropTypes.string,
      status: PropTypes.string,
      result: PropTypes.shape({
        goalsAwayTeam: PropTypes.number,
        goalsHomeTeam: PropTypes.number,
      }),
    })),
  }

  static defaultProps = {
    fixturesItems: [],
  }

  state = {
    showCompetitionFixtures: true,
  }

  toggleCompetitionFixtures = () => {
    this.setState(state => ({
      showCompetitionFixtures: !state.showCompetitionFixtures,
    }));
  }

  render() {
    const {
      fixturesItems,
      competitionInfo: {
        caption: competitionName,
      },
    } = this.props;

    return (
      <article className="MatchCenterCompetition">
        <h3 className="MatchCenterCompetition__title">
          <button
            className="MatchCenterCompetition__toggle-fixtures-btn"
            type="button"
            onClick={this.toggleCompetitionFixtures}
            title={competitionName}
          >
            {competitionName}
          </button>
        </h3>

        <div
          className="MatchCenterCompetition__fixtures"
          style={{
            maxHeight: this.state.showCompetitionFixtures ? '100%' : '0',
          }}
        >
          <FixturesList fixturesItems={fixturesItems} />
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  competitionInfo: getCompetitionInfo(ownProps.competitionId, state),
});

export default connect(mapStateToProps)(MatchCenterCompetition);
