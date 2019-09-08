import React, { Component } from 'react'
import {hot} from 'react-hot-loader'; 
import Hello from './pages/hello/hello'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={Hello}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

declare const module: any; // 为了取消 ts报错
export default hot(module)(App);