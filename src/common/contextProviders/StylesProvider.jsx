import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StylesProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  }

  getChildContext() {
    const { context } = this.props;
    return context;
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}
