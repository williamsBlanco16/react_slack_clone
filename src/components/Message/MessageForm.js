import React, { Component } from 'react'
import { Segment, Input, Button } from 'semantic-ui-react'

import firebase from '../../firebase'

class MessageForm extends Component {
  state={
    message:'',
    loading:false,
    channel:'',
    user:'',
    errors:[]
  } 

  static getDerivedStateFromProps(props,state){
    if(props.currentChannel !== state.channel){
      return{
        channel:props.currentChannel,
        user:props.currentUser
      }
    }
    return null;
  }

  handleChange = event=>{
    this.setState({[event.target.name]:event.target.value});

  }

  sendMessage = ()=>{
    const {messagesRef} = this.props;
    const {message, channel} = this.state;

    if(message){
      this.setState({loading:true})
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(()=>{
          this.setState({loading:false, message:'',errors:[]})
        })
        .catch(err=>{
          console.log(err);
          this.setState({
            loading:false,
            errors:this.state.errors.concat(err)
          })
        })
    }else{
      this.setState({
        errors:this.state.errors.concat({message:'Add a message'})
      })
    }
  }

  createMessage=()=>{
    const message = {
      timestamp:firebase.database.ServerValue.TIMESTAMP,
      content: this.state.message,
      user:{
        id: this.state.user.uid,
        name:this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
      content:this.state.message
    }

    return message;
  }

  render() {
    const {errors, message,loading} = this.state;
    return (
      <Segment>
        <Input
          fluid
          name="message"
          style={{marginBottom:'0.7em'}}
          label={<Button icon={'add'}/>}
          labelPosition="left"
          value={message}
          placeholder="write your message"
          onChange={this.handleChange}
          className={
            errors.some(error => error.includes('message'))
              ?'error'
              :''
          }
        />

        <Button.Group icon widths="2">
          <Button
            disabled={loading}
            color="orange"
            content="add Reply"
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
          />

          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    )
  }
}

export default MessageForm;
