import React, { Component } from 'react'
import {Segment, Comment} from 'semantic-ui-react'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'

class Message extends Component {
  render() {
    return (
      <React.Fragment>
        <MessagesHeader/>
        <Segment>
          <Comment.Group className="messages">
            {/**Message */}
          </Comment.Group>
        </Segment>

        <MessageForm/>
      </React.Fragment>
    )
  }
}

export default Message;
