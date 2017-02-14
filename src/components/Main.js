import React, { Component } from 'react';

export default class MainPane extends Component {
  render() {
    return (
      <div className="App-main left">
        {this.props.children}
      </div>
    );
  }
}
