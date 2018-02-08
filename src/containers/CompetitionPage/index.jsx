import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';

import { getCompetition } from 'selectors';

const COMPETITION_ID_REG_EXP = /[\d]{1,}$/;

class CompetitionPage extends Component {
  static propTypes = {
    needRedirectToIndex: PropTypes.bool.isRequired,
    competition: PropTypes.shape({
      caption: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  }

  componentDidMount() {
    if (
      this.props.needRedirectToIndex
      || !COMPETITION_ID_REG_EXP.test(this.props.match.params.id)
    ) {
      this.props.history.replace('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.needRedirectToIndex
      || !COMPETITION_ID_REG_EXP.test(nextProps.match.params.id)
    ) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { competition } = this.props;

    return (
      <AppPage title={competition.caption}>
        <AppPageTitle>{competition.caption}</AppPageTitle>

        <AppPageContent>
          Competition info
        </AppPageContent>

      </AppPage>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: {
        id,
      },
    },
  } = ownProps;

  const isCompeitionsInitialized = state.competitions.isInitialized;
  const competition = getCompetition(state, id);
  const needRedirectToIndex = (
    isCompeitionsInitialized
    && Object.keys(competition).length === 0
  );

  return {
    needRedirectToIndex,
    competition,
  };
};

export default connect(mapStateToProps)(CompetitionPage);
