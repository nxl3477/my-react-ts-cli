import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

class PageRouter extends React.PureComponent{
  render() {
    return (
      <BrowserRouter >
        <Route path="/" component={()=> 'hell react'}></Route>
      </BrowserRouter>
    )
  }
}




export default PageRouter