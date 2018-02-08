import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppPage from 'components/AppPage';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';

import { getCompetitionInfo } from 'selectors';

const COMPETITION_ID_REG_EXP = /[\d]{1,}$/;

class CompetitionPage extends Component {
  static propTypes = {
    needRedirectToIndex: PropTypes.bool.isRequired,
    competitionInfo: PropTypes.shape({
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
    const { competitionInfo } = this.props;

    return (
      <AppPage title={competitionInfo.caption}>
        <AppPageTitle>{competitionInfo.caption}</AppPageTitle>

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
  const competitionInfo = getCompetitionInfo(state, id);
  const needRedirectToIndex = (
    isCompeitionsInitialized
    && Object.keys(competitionInfo).length === 0
  );

  return {
    needRedirectToIndex,
    competitionInfo,
  };
};

export default connect(mapStateToProps)(CompetitionPage);
