import React, { Component } from 'react'
import {hot} from 'react-hot-loader'; 
import Hello from './pages/hello/hello'
class App extends Component {
  render() {
    return (
      <div>
        app : 
        <Hello></Hello>
      </div>
    )
  }
}


export default hot(module)(App);