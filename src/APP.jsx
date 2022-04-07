import React, { Component, useState, useEffect } from 'react'
import { hot } from 'react-hot-loader';
import PageRouter from './Router'

class App extends Component {

  render() {
    return (
      <div>
        <PageRouter />
      </div>
    )
  }
}

export default hot(module)(App);