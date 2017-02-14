import React, { Component } from 'react';

export default class DebugInfo extends Component {


  render() {
    return (
      <div>
        Current Breakpoint: {this.props.currentBreakpoint} ({this.props.cols} columns)
      </div>);
  }
}
