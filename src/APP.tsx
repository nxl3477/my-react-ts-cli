import React, { Component } from 'react'
import {hot} from 'react-hot-loader'; 
import Hello from './pages/hello/hello'
import { Button, Select } from 'antd';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
const { Option } = Select;
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={Hello}/>
          </Switch>
        </BrowserRouter>
        <Button>是第几集解决</Button>
        <Select defaultValue=".com" style={{ width: 80 }}>
          <Option value=".com">.com</Option>
        </Select>
      </div>
    )
  }
}

declare const module: any; // 为了取消 ts报错
export default hot(module)(App);