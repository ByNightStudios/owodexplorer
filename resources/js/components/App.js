
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header/Header'

import "antd/dist/antd.css";

class App extends Component {
  render () {
    return (
      <BrowserRouter>
          <Header />
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))