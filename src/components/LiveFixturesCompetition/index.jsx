import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FixturesList from 'components/FixturesList';

import './LiveFixturesCompetition.scss';

export default class LiveFixturesCompetition extends Component {
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
      <article className="LiveFixturesCompetition">
        <h3 className="LiveFixturesCompetition__title">
          <button
            className="LiveFixturesCompetition__toggle-fixtures-btn"
            type="button"
            onClick={this.toggleCompetitionFixtures}
            title={title}
          >
            {title}
          </button>
        </h3>

        <div
          className="LiveFixturesCompetition__fixtures"
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
