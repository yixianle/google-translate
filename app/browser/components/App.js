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
      console.log('parsed json', json)
      this.setState({ transResult: json.text.replace(/\n/g, '<br \/>') })
      //this.setState({ transResult: '马来西亚警方说，\n 他们在狩猎当天狩<br/>猎从该国逃离的四名朝鲜人' })
    }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex)
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
