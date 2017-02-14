// @flow

import _ from 'lodash';
import React, { Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import DebugInfo from './DebugInfo';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import './Document.base.css';
import './Document.css';

export default class Document extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: 'lg',
      mounted: false,
      layouts: {lg: this.props.initialLayout}
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
  }

  static propTypes = {
    // onLayoutChange: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    initialLayout: generateLayout()
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? 'static' : ''}>
          {l.static ?
            <span className="text" title="This item is static and cannot be removed or resized.">Static - {i}</span>
            : <span className="text">{i}</span>
          }
        </div>);
    });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onLayoutChange(layout, layouts) {

  }

  onNewLayout() {
    this.setState({
      layouts: {lg: generateLayout()}
    });
  }

  onNewItem() {
    const layouts = this.state.layouts;
    const lg = layouts.lg;

    this.setState({
      layouts: {lg: lg}
    });
  }

  render() {
    return (
      <div>
        <DebugInfo
          currentBreakpoint={this.state.currentBreakpoint}
          cols={this.props.cols[this.state.currentBreakpoint]} />
        <div>
          <button onClick={this.onNewLayout}>Generate New Layout</button>
          <button onClick={this.onNewItem}>Add New Item</button>
        </div>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={true}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}>
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function generateLayout() {
  return _.map(_.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: _.random(0, 5) * 2 % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}
