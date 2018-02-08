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
    id: PropTypes.number.isRequired,
    competition: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ])),
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    competition: {},
  }

  componentDidMount() {
    if (!COMPETITION_ID_REG_EXP.test(this.props.id) || !this.props.competition.id) {
      this.props.history.replace('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!COMPETITION_ID_REG_EXP.test(nextProps.id) || !nextProps.competition.id) {
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

const mapStateToProps = (state, {
  match: {
    params: {
      id,
    },
  },
}) => ({
  id: parseInt(id, 10),
  competition: getCompetition(state, id) || {},
});

export default connect(mapStateToProps)(CompetitionPage);
