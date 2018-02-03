import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FixturesList from 'components/FixturesList';

import './MatchCenterCompetition.scss';

export default class MatchCenterCompetition extends Component {
  static propTypes = {
    title: PropTypes.string,
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
    title: '',
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
      title,
    } = this.props;

    return (
      <article className="MatchCenterCompetition">
        <h3 className="MatchCenterCompetition__title">
          <button
            className="MatchCenterCompetition__toggle-fixtures-btn"
            type="button"
            onClick={this.toggleCompetitionFixtures}
            title={title}
          >
            {title}
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
