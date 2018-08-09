import React, { Component } from 'react'
import { Base64 } from 'js-base64'
import queryString from 'query-string'
import ReactDOM from 'react-dom'
import UiIframe from './UiIframe'

class UiWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      path: '' // base64
    }
  }

  componentWillMount () {
    this.setPath(this.props.location.search)
  }

  setPath = (path) => {
    this.setState({
      path: path
    })
  }
  decodePath = (path) => {

  }
  render() {
    return (
      <div>
        <UiIframe path={this.state.path} setPath={this.setPath}></UiIframe>
      </div>
    )
  }
}

export default UiWrapper
