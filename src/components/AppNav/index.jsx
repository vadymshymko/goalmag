import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppNavSection from 'components/AppNavSection';

import './AppNav.scss';

const COMPETITION_COUNTRIES = [
  {
    title: 'International',
    leagueCodes: ['CL'],
  },
  {
    title: 'England',
    leagueCodes: ['PL', 'ELC', 'EL1', 'EL2'],
  },
  {
    title: 'France',
    leagueCodes: ['FL1', 'FL2'],
  },
  {
    title: 'Germany',
    leagueCodes: ['BL1', 'BL2'],
  },
  {
    title: 'Italy',
    leagueCodes: ['SA', 'SB'],
  },
  {
    title: 'Portugal',
    leagueCodes: ['PPL'],
  },
  {
    title: 'Spain',
    leagueCodes: ['PD'],
  },
];

class AppNav extends Component {
  static propTypes = {
    locationPathname: PropTypes.string.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      caption: PropTypes.string,
    })),
  }

  static defaultProps = {
    competitions: [],
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.locationPathname !== this.props.locationPathname
      || nextProps.competitions.length !== this.props.competitions.length
    );
  }

  getCompetitionsByLeagueCodes = (leagues = []) => (
    this.props.competitions.filter(item => (
      !!leagues.find(league => (
        league.toLowerCase() === item.league.toLowerCase()
      ))
    ))
  )

  getCompetitionsLinks = (competitionsLeagueCodes = []) => (
    this.getCompetitionsByLeagueCodes(competitionsLeagueCodes).map(competition => ({
      to: `/competition/${competition.id}`,
      title: competition.caption,
    }))
  )

  getSections = () => (
    COMPETITION_COUNTRIES.map((country) => {
      const countryCompetitionsLinks = this.getCompetitionsLinks(country.leagueCodes);
      const isActive = !!countryCompetitionsLinks.find(link => (
        link.to === this.props.locationPathname
      ));

      return ({
        ...country,
        links: countryCompetitionsLinks,
        isActive,
      });
    })
  )

  render() {
    const {
      locationPathname,
    } = this.props;

    const navSections = this.getSections();

    return (
      <nav className="AppNav">
        <AppNavSection
          links={[
            {
              to: '/match-center',
              title: 'Match Center',
            },
          ]}
          isActive={locationPathname === '/match-center'}
        />

        {navSections.map(section => (
          <AppNavSection
            key={section.title}
            title={section.title}
            links={section.links}
            isActive={section.isActive}
          />
        ))}
      </nav>
    );
  }
}

export default AppNav;
