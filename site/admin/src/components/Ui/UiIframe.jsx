import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { on, decode, encode, getQueryObj } from '../../libs/util'

class UiIframe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      path: ''
    }
  }
  componentDidMount () {
    this.decodePath(this.props.path)
    const iframe = ReactDOM.findDOMNode(this.refs.iframe)
    on(iframe, 'load', this.onLoad)
  }
  onLoad = () => {
    const iframe = ReactDOM.findDOMNode(this)
    // TODO: 处理面版点击 这里需要做功能解耦，可以将功能做插件的形式插入，应用在rp或者 sketch 导出的文件
    const artboardList = Array.from(iframe.contentDocument.querySelectorAll('.artboard'))
    artboardList.forEach(element => {
      on(element, 'click', handleMenuClick)
    })
  }
  handleMenuClick = (event) => {
    var hash = 'artboard' + event.currentTarget.getAttribute('data-index')
  }
  decodePath = (path) => {
    const obj = getQueryObj(path)
    const iframePath = obj['path'] ? decode(obj['path']) : ''
    const iframeHash = obj['hash'] ? decode(obj['hash']) : ''
    console.log('???', iframePath, iframeHash, '???')
    this.setPath(`${iframePath}/${iframeHash}`)
  }

  encodePath = (path) => {

  }
  setPath = (path) => {
    this.setState({
      path: path
    })
  }
  render() {
    return (
      <iframe ref="iframe" src={this.state.path}></iframe>
    )
  }
}

export default UiIframe
