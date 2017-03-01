import React, { PropTypes, Component } from 'react'

import classnames from 'classnames'
import {isUrl} from '../../util'

let timeoutId;

export default class Header extends Component {
  static propTypes = {
    changeVal: PropTypes.func.isRequired
  }

  state = {
    text: '',
    height: null
  }

  handleChange = e => {
    const { changeVal } = this.props
    const input = e.target
    
    if(isUrl(this.state.text) && /\n$/.test(input.value) ) return
    this.setState({
      text: input.value,
      height: input.scrollHeight
    })

    if(isUrl(this.state.text)) return
    // 2秒后在执行查询
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      changeVal(input.value)
    }, 1*1000);
    
  }

  handleKeyDown = e =>{
    console.log(e.keyCode,1111)
    if(e.keyCode!==13) return;
    
    if(isUrl(e.target.value)){
      window.open('/translate/page?u='+encodeURIComponent(e.target.value))
    }
  }

  render() {
    return (
      <header className="header box-shadow">
        <h1>translate</h1>
        <div className="box-search">
          <textarea className="search-input"
            style={ this.state.height && { height: this.state.height } }
            placeholder="输入要翻译的文字或网页地址"
            autoFocus="true"
            value={ this.state.text }
            onChange={ this.handleChange }
            onKeyDown={ this.handleKeyDown }
             />
        </div>
        
      </header>
    )
  }
}
