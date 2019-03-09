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
    return this.props.context;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
