import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';
import Table from 'components/Table';

import styles from './TeamPage.scss';

class TeamPage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
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
    const {
      id,
      fetchData,
      dispatch,
    } = this.props;

    fetchData(dispatch, { id });
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      fetchData,
      dispatch,
    } = this.props;
    const { id: prevId } = prevProps;

    if (id !== prevId) {
      fetchData(dispatch, { id });
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
        className={styles.TeamPage}
      >
        <AppPageHeader>
          <AppPageTitle>
            {logoURL && (
              <img
                className={styles.TeamPage__logo}
                src={logoURL}
                alt={name}
                title={name}
              />
            )}

            {name}
          </AppPageTitle>
        </AppPageHeader>

        <AppPageContent>
          <Table
            className={styles.TeamPage__squadTable}
            headings={[
              {
                key: 'shirtNumber',
                label: '№',
              },
              {
                key: 'name',
                label: 'Name',
              },
              {
                key: 'position',
                label: 'Position',
              },
              {
                key: 'nationality',
                label: 'Nationality',
              },
              {
                key: 'dateOfBirth',
                label: 'Date of Birth',
              },
            ]}
            rows={players}
          />

          {coach.name && (
            <p className={styles.TeamCoach}>Coach: {coach.name}</p>
          )}
        </AppPageContent>
      </AppPage>
    );
  }
}

export default withStyles(styles)(TeamPage);
