import React, { Component } from 'react'
import {Segment, Comment} from 'semantic-ui-react'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'

import firebase from '../../firebase'

class Message extends Component {

  state={
    messagesRef:firebase.database().ref('messages'),
    channel: '',
    user:''
  }

  static getDerivedStateFromProps(props,state){
    if(props.currentChannel!==state.channel){
      return{
        channel:props.currentChannel,
        user:props.currentUser
      }
    }
    return null;
  }

  render() {
    const {messagesRef, channel, user} =  this.state;

    return (
      <React.Fragment>
        <MessagesHeader/>
        <Segment>
          <Comment.Group className="messages">
            {/**Message */}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    )
  }
}

export default Message;
