import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppNavSection from 'components/AppNavSection';

import styles from './AppNav.scss';

class AppNav extends Component {
  static propTypes = {
    fetchCompetitions: PropTypes.func.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onRequestHide: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
  }

  componentDidUpdate(prevProps) {
    const { location, isVisible, onRequestHide } = this.props;
    const { location: prevLocation } = prevProps;

    if (location.pathname !== prevLocation.pathname && isVisible) {
      onRequestHide();
    }
  }

  getIsActiveCompetition = (competition) => {
    const {
      location: {
        pathname,
      },
    } = this.props;

    return competition.url === pathname;
  }

  getCompetitionsByArea = competitions => (
    competitions.reduce((result, item) => {
      const areaId = item.area.id;
      const areaName = item.area.name;
      const areaCompetitions = result[areaId]
        ? result[areaId].competitions || []
        : [];

      return {
        ...result,
        [areaId]: {
          id: areaId,
          name: areaName,
          competitions: [
            ...areaCompetitions,
            {
              ...item,
              url: `/competition/${item.id}`,
            },
          ],
        },
      };
    }, {})
  )

  getSections = (competitions = []) => {
    const competitionsByArea = this.getCompetitionsByArea(competitions);

    return Object.keys(competitionsByArea).reduce((result, areaId) => ([
      ...result,
      {
        isActive: competitionsByArea[areaId].competitions.some(this.getIsActiveCompetition),
        ...competitionsByArea[areaId],
      },
    ]), []);
  }

  render() {
    const {
      competitions,
    } = this.props;

    const sections = this.getSections(competitions);

    return (
      <nav className={styles.AppNav}>
        <AppNavSection
          competitions={[
            {
              id: 'match-center',
              name: 'Match Center',
              url: '/',
            },
          ]}
        />

        {sections.map(section => (
          <AppNavSection
            key={section.id}
            name={section.name}
            competitions={section.competitions}
            isActive={section.isActive}
          />
        ))}
      </nav>
    );
  }
}

export default withStyles(styles)(AppNav);
