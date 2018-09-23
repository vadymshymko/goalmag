import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import SquadPlayersTable from 'components/SquadPlayersTable';

import './TeamPage.scss';

export default class TeamPage extends Component {
  static propTypes = {
    fetchTeam: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    logoURL: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.object),
    coach: PropTypes.shape({
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    name: '',
    logoURL: null,
    players: [],
    coach: {},
  }

  componentDidMount() {
    const { id } = this.props;

    this.props.fetchTeam(id);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props;
    const { id: nextId } = nextProps;

    if (nextId !== id) {
      this.props.fetchTeam(nextId);
    }
  }

  render() {
    const {
      name,
      logoURL,
      players,
      coach,
    } = this.props;

    return (
      <AppPage
        title={name}
        description={`Team squad, players and fixtures - ${name}`}
        className="TeamPage"
      >
        <AppPageHeader>
          <AppPageTitle>
            {logoURL && (
              <img
                className="TeamPage__logo"
                src={logoURL}
                alt={name}
                title={name}
              />
            )}

            {name}
          </AppPageTitle>
        </AppPageHeader>

        <AppPageContent>
          <SquadPlayersTable players={players} />

          {coach && (
            <p className="TeamCoach">Coach: {coach.name}</p>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}
