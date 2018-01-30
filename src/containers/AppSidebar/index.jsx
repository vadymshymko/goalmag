import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCompetitions } from 'actions';

import AppHeader from 'components/AppHeader';
import AppNav from 'components/AppNav';

import './AppSidebar.scss';

class AppSidebar extends Component {
  static propTypes = {
    competitionsItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      caption: PropTypes.string,
    })),
    getCompetitions: PropTypes.func,
  }

  static defaultProps = {
    competitionsItems: {},
    getCompetitions: () => {},
  }

  componentDidMount() {
    this.props.getCompetitions();
  }

  render() {
    const { competitionsItems } = this.props;

    return (
      <div className="AppSidebar">
        <AppHeader />

        <AppNav competitionsItems={competitionsItems} />
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

export default connect(mapStateToProps, actions)(AppSidebar);
