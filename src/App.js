import React, { Component } from 'react';
import { Header, Main, Side } from './components';
import { Row, Document } from './document';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main>
            <Row>
              <span>hellow world</span>
            </Row>
            <Row>
              <Document />
            </Row>
        </Main>
        <Side />
      </div>
    );
  }
}

export default App;
