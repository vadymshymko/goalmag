import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCompetitions } from 'actions';

import {
  getCompetitionsLinks,
  getIsCompetitionsInitialized,
} from 'selectors';

import AppHeader from 'components/AppHeader';
import Container from 'components/Container';
import AppNav from 'components/AppNav';
import AppInner from 'components/AppInner';

import './App.scss';

const COMPETITION_COUNTRIES = [
  {
    title: 'International',
    leagueCodes: ['CL'],
    links: [],
    isActive: false,
  },
  {
    title: 'England',
    leagueCodes: ['PL', 'ELC', 'EL1', 'EL2'],
    links: [],
    isActive: false,
  },
  {
    title: 'France',
    leagueCodes: ['FL1', 'FL2'],
    links: [],
    isActive: false,
  },
  {
    title: 'Germany',
    leagueCodes: ['BL1', 'BL2'],
    links: [],
    isActive: false,
  },
  {
    title: 'Italy',
    leagueCodes: ['SA', 'SB'],
    links: [],
    isActive: false,
  },
  {
    title: 'Netherlands',
    leagueCodes: ['DED'],
    links: [],
    isActive: false,
  },
  {
    title: 'Portugal',
    leagueCodes: ['PPL'],
    links: [],
    isActive: false,
  },
  {
    title: 'Spain',
    leagueCodes: ['PD'],
    links: [],
    isActive: false,
  },
];

class App extends Component {
  static propTypes = {
    fetchCompetitions: PropTypes.func.isRequired,
    isCompetitionsInitialized: PropTypes.bool.isRequired,
    navSections: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.node,
  }

  static defaultProps = {
    navSections: [],
    children: null,
  }

  componentDidMount() {
    this.props.fetchCompetitions();
  }

  render() {
    const {
      navSections,
      isCompetitionsInitialized,
      children,
    } = this.props;

    return (
      <div className="App">
        <AppHeader />

        <div className="App__content">
          <Container>
            <AppNav navSections={navSections} />

            <AppInner isCompetitionsInitialized={isCompetitionsInitialized}>
              {children}
            </AppInner>
          </Container>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const locationPathname = props.location.pathname;

  return {
    locationPathname,
    isCompetitionsInitialized: getIsCompetitionsInitialized(state),
    navSections: [
      {
        title: '',
        links: [
          {
            to: '/match-center',
            title: 'Match Center',
          },
        ],
        isActive: locationPathname === '/match-center',
      },
      ...COMPETITION_COUNTRIES.map((country) => {
        const links = getCompetitionsLinks(state, country.leagueCodes);
        const isActive = !!links.find(link => (
          link.to === locationPathname
        ));

        return ({
          ...country,
          links,
          isActive,
        });
      }),
    ],
  };
};

const actions = {
  fetchCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(App));
