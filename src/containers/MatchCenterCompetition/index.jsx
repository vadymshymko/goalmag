import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFixtures } from 'selectors';

import FixturesList from 'components/FixturesList';

import './MatchCenterCompetition.scss';

class MatchCenterCompetition extends Component {
  static propTypes = {
    competitionName: PropTypes.string.isRequired,
    competitionFixtures: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    competitionFixtures: [],
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
      competitionFixtures,
      competitionName,
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
            maxHeight: this.state.showCompetitionFixtures
              ? '100%'
              : '0',
          }}
        >
          <FixturesList fixtures={competitionFixtures} />
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state, props) => ({
  competitionFixtures: getFixtures(state).filter(item => (
    parseInt(item.competitionId, 10) === parseInt(props.competitionId, 10)
  )),
});

export default connect(mapStateToProps)(MatchCenterCompetition);
