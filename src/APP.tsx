import React, { Component } from 'react'
import {hot} from 'react-hot-loader'; 
import TodoList from './pages/todolist/todolist'
import Sync from './pages/sync/sync'
import Meno from './pages/memo/memo'
import Context from './pages/context/context'
import Reftest from './pages/ref/ref'
import Errorfun from './pages/errrorfun/errorfun'
import Lifecycle from './pages/lifecycle/lifecycle'
import Tstest from './pages/tstest/testest'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={TodoList}/>
            <Route exact path="/sync" component={Sync} />
            <Route exact path="/memo" component={Meno} />
            <Route exact path="/context" component={Context} />
            <Route exact path="/Reftest" component={Reftest} />
            <Route exact path="/errorfun" component={Errorfun} />
            <Route exact path="/lifecycle" component={Lifecycle} />
            <Route exact path="/tetest" component={Tstest} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

declare const module: any; // 为了取消 ts报错
export default hot(module)(App);