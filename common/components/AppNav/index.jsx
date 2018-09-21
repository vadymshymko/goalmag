import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppNavSection from 'components/AppNavSection';

import './AppNav.scss';

class AppNav extends Component {
  static propTypes = {
    onRequestHide: PropTypes.func.isRequired,
    showContent: PropTypes.bool.isRequired,
    fetchCompetitions: PropTypes.func.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.PropTypes.string,
    }).isRequired,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
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
      onRequestHide,
      showContent,
      competitions,
    } = this.props;

    const sections = this.getSections(competitions);

    return (
      <nav className={`AppNav ${showContent ? 'AppNav--visible' : ''}`}>
        <div
          className="AppNav__bg"
          role="presentation"
          onClick={onRequestHide}
        />

        <div className="AppNav__content">
          <div className="AppNavHide">
            <button
              className="AppNavHide__btn"
              type="button"
              onClick={onRequestHide}
              title="Hide Navigation"
              aria-label="Hide Navigation"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                className="AppNavHide__icon"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
          </div>

          <AppNavSection
            competitions={[
              {
                id: 'match-center',
                name: 'Match Center',
                url: '/match-center',
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
        </div>
      </nav>
    );
  }
}

export default AppNav;
