import React,{ Component } from 'react';
import 'whatwg-fetch'

import Header from "./Header"
import MainSection from "./MainSection"

export default class App extends Component {

  state = {
    transResult: ''
  }

  changeVal = val => {

    // api翻译
    fetch('/translate/api',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: val
      })
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      
      this.setState({ transResult: json.text.replace(/\n/g, '<br \/>') })
    }.bind(this)).catch(function(ex) {
      console.error('parsing failed', ex)
    })


    //this.setState({ transResult: val })
  }
  render() {
    return (
      <div>
        <Header changeVal={this.changeVal} />
        <MainSection result={this.state.transResult} />
      </div>
    )
  }
}
