import React,{ Component } from 'react';
import QueueAnim from 'rc-queue-anim';

export default class MainSection extends Component {
  render() {
    const { result } = this.props
    return (
      <QueueAnim interval={100} delay={1000} duration={1000}>
        {result && <section key="1" className="main box-shadow">
            <div className="result" dangerouslySetInnerHTML={{__html: result}}></div>
        </section>}
      </QueueAnim>
    )
  }
}
