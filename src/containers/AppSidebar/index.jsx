import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCompetitions } from 'actions';

import AppHeader from 'components/AppHeader';
import AppNav from 'components/AppNav';

import './AppSidebar.scss';

const DEFAULT_COMPEITIONS_ITEMS = [
  {
    id: 'england',
    caption: 'England',
    items: [],
  },
  {
    id: 'spain',
    caption: 'Spain',
    items: [],
  },
  {
    id: 'italy',
    caption: 'Italy',
    items: [],
  },
  {
    id: 'germany',
    caption: 'Germany',
    items: [],
  },
  {
    id: 'france',
    caption: 'France',
    items: [],
  },
  {
    id: 'netherlands',
    caption: 'Netherlands',
    items: [],
  },
  {
    id: 'portugal',
    caption: 'Portugal',
    items: [],
  },
];

const getCompetitionCountryById = (competitionId) => {
  if (competitionId >= 445 && competitionId <= 448) {
    return 'england';
  } else if (competitionId === 455) {
    return 'spain';
  } else if (competitionId === 456 || competitionId === 459) {
    return 'italy';
  } else if (competitionId === 452 || competitionId === 453) {
    return 'germany';
  } else if (competitionId === 450 || competitionId === 451) {
    return 'france';
  } else if (competitionId === 449) {
    return 'netherlands';
  } else if (competitionId === 455) {
    return 'portugal';
  }

  return null;
};

const getCompetitionsItemsGroupedByCountry = competitionsItems => (
  competitionsItems.reduce((result, item) => {
    const itemCountry = getCompetitionCountryById(item.id);

    if (itemCountry) {
      return result.map((resultItem) => {
        if (resultItem.id === itemCountry) {
          return {
            ...resultItem,
            items: [
              ...resultItem.items,
              item,
            ],
          };
        }

        return resultItem;
      });
    } else if (item.id === 464) {
      return [
        ...result,
        item,
      ];
    }

    return result;
  }, DEFAULT_COMPEITIONS_ITEMS)
);

class AppSidebar extends Component {
  static propTypes = {
    getCompetitions: PropTypes.func.isRequired,
    competitionsItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      caption: PropTypes.string,
    })).isRequired,
  }

  componentDidMount() {
    this.props.getCompetitions();
  }

  render() {
    const { competitionsItems } = this.props;

    const competitionsItemsToShow = getCompetitionsItemsGroupedByCountry(competitionsItems);

    return (
      <div className="AppSidebar">
        <AppHeader />

        <AppNav
          competitionsItems={competitionsItems}
          competitionsItemsToShow={competitionsItemsToShow}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  competitionsItems: state.competitions.items,
});

const actions = {
  getCompetitions,
};

export default withRouter(connect(mapStateToProps, actions)(AppSidebar));
