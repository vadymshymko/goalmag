import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFixturesByCompetitionId } from 'selectors';

import FixturesList from 'components/FixturesList';

import './MatchCenterCompetition.scss';

class MatchCenterCompetition extends Component {
  static propTypes = {
    competition: PropTypes.shape({
      id: PropTypes.number,
      caption: PropTypes.string,
    }).isRequired,
    fixtures: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    fixtures: [],
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
      fixtures,
      competition: {
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
          <FixturesList fixtures={fixtures} />
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state, props) => ({
  fixtures: getFixturesByCompetitionId(state, props.competition.id),
});

export default connect(mapStateToProps)(MatchCenterCompetition);
