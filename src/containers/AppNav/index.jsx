import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { fetchCompetitions } from 'actions';

import './AppNav.scss';

class AppNav extends Component {
  static propTypes = {
    fetchCompetitions: PropTypes.func.isRequired,
    competitionsItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      caption: PropTypes.string,
    })).isRequired,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
  }

  getCompetitionsByLeagueCodes = (leagues = []) => (
    this.props.competitionsItems.filter(item => (
      !!leagues.find(league => (
        league.toLowerCase() === item.league.toLowerCase()
      ))
    ))
  )

  renderCompetitionsList = (competitionsLeagueCodes = []) => (
    <ul className="AppNav__list">
      {this.getCompetitionsByLeagueCodes(competitionsLeagueCodes).map(competition => (
        <li
          className="AppNav__item"
          key={competition.id}
        >
          <NavLink
            className="AppNav__link"
            activeClassName="AppNav__link--active"
            to={`/competitions/${competition.id}`}
            exact
            title={competition.caption}
          >
            {competition.caption}
          </NavLink>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <nav className="AppNav">
        <div className="AppNav__section">
          <NavLink
            className="AppNav__link"
            activeClassName="AppNav__link--active"
            exact
            to="/match-center"
            title="Match Center"
          >
            Match Center
          </NavLink>
        </div>

        <div className="AppNav__section">
          {this.renderCompetitionsList(['CL'])}
        </div>

        <div className="AppNav__section">
          <span className="AppNav__title">Australia</span>

          {this.renderCompetitionsList(['AAL'])}
        </div>

        <div className="AppNav__section">
          <span className="AppNav__title">England</span>

          {this.renderCompetitionsList(['PL', 'ELC', 'EL1', 'EL2'])}
        </div>

        <div className="AppNav__section">
          <span className="AppNav__title">France</span>

          {this.renderCompetitionsList(['FL1', 'FL2'])}
        </div>

        <div className="AppNav__section">
          <span className="AppNav__title">Germany</span>

          {this.renderCompetitionsList(['BL1', 'BL2', 'DFB'])}
        </div>

        <div className="AppNav__section">
          <span className="AppNav__title">Italy</span>

          {this.renderCompetitionsList(['SA', 'SB'])}
        </div>

        <div className="AppNav__section">
          <span className="AppNav__title">Portugal</span>

          {this.renderCompetitionsList(['PPL'])}
        </div>

        <div className="AppNav__section">
          <span className="AppNav__title">Spain</span>

          {this.renderCompetitionsList(['PD'])}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  competitionsItems: state.competitions.items,
});

const actions = {
  fetchCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(AppNav));
