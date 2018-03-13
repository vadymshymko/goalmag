import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import SquadTable from 'components/SquadTable';

import './TeamPage.scss';

export default class TeamPage extends Component {
  static propTypes = {
    fetchTeam: PropTypes.func.isRequired,
    fetchSquad: PropTypes.func.isRequired,
    teamId: PropTypes.number.isRequired,
    teamInfo: PropTypes.shape({
      name: PropTypes.string,
      crestUrl: PropTypes.string,
    }),
    teamSquad: PropTypes.shape({
      players: PropTypes.arrayOf(PropTypes.object),
    }),
  }

  static defaultProps = {
    teamInfo: {},
    teamSquad: {},
  }

  componentDidMount() {
    const { teamId } = this.props;

    this.props.fetchTeam(teamId);
    this.props.fetchSquad(teamId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      teamId,
    } = this.props;

    const {
      teamId: nextTeamId,
    } = nextProps;

    if (nextTeamId !== teamId) {
      this.props.fetchTeam(nextTeamId);
      this.props.fetchSquad(nextTeamId);
    }
  }

  render() {
    const {
      teamInfo: {
        name = '',
        crestUrl = '',
      },
      teamSquad: {
        players = [],
      },
    } = this.props;

    return (
      <AppPage
        title={name}
        description={`Team squad, players and fixtures - ${name}`}
        className="TeamPage"
      >
        <AppPageHeader>
          <AppPageTitle>
            {crestUrl && (
              <img
                className="TeamPage__logo"
                src={crestUrl}
                alt={name}
                title={name}
              />
            )}

            {name}
          </AppPageTitle>
        </AppPageHeader>

        <AppPageContent>
          <SquadTable players={players} />
        </AppPageContent>
      </AppPage>
    );
  }
}
