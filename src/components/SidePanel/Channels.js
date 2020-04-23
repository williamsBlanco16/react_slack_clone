import React, { Component } from 'react'
import firebase from '../../firebase'
import {Icon, Menu, Modal, Form, Input, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setCurrentChannel} from '../../actions'
class Channels extends Component {
  state = {
    user:'',
    channels:[],
    modal:false,
    channelName:'',
    channelDetails:'',
    channelRef: firebase.database().ref('channels ')
  }

  static getDerivedStateFromProps(props,state){
    if(props.currentUser !== state.user){
      return {
        user:props.currentUser
      }
    }
    return null;
  }

  addChannel = ()=>{
    const{channelName,channelDetails,channelRef, user} = this.state;

    const key = channelRef.push().key;

    const newChannel = {
      id:key,
      name:channelName,
      details:channelDetails,
      createdBy: {
        name:user.displayName,
        avatar:user.photoURL
      }
    }

    channelRef
      .child(key)
      .update(newChannel)
      .then(()=>{
        this.setState({channelName:'',channelDetails:''})
        this.closeModal();
        console.log('channel add');
      })
      .catch(err =>{
        console.log(err)
      })
  }

  componentDidMount(){
    this.addListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelRef.on('child_added',snap =>{
      loadedChannels.push(snap.val()); 
      this.setState({channels:loadedChannels}) 
    })
  }

  handleSubmit = event =>{
    event.preventDefault();
    if(this.isFormValid(this.state)){
      this.addChannel()
    }
  }

  isFormValid = ({channelName, channelDetails})=>{
    return channelName && channelDetails;
  }

  handleChange = event=>{
    this.setState({[event.target.name]:event.target.value})
  }
  
  changeChannel = channel =>{
    this.props.setCurrentChannel(channel); //dispatch
  }

  closeModal= ()=> this.setState({modal:false})

  openModal= ()=> this.setState({modal:true})

  displayChannels = channels =>(
    channels.length > 0 && channels.map(channel =>(
      <Menu.Item
        key={channel.id}
        onClick={()=>this.changeChannel(channel)}
        name={channel.name}
        style={{opacity:0.7}}
      >
        # {channel.name}
      </Menu.Item>
    ))
  )
  

  render() {
    const {channels,modal} = this.state;

    return (
      <React.Fragment>
      <Menu.Menu style={{paddingBottom:'2em'}}>
        <Menu.Item>
          <span>
            <Icon name='exchange'/> CHANNELS
          </span>{' '}
          ({channels.length})<Icon name='add' onClick = {this.openModal}/>
        {/*Channels*/}
        </Menu.Item>

        {this.displayChannels(channels)}

        {/*add channels*/}
        <Modal basic open = {modal} onClose = {this.closeModal}>
          <Modal.Header>
            Add Channel
          </Modal.Header>

          <Modal.Content>
            <Form onSubmit={this.handeSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name='channelName'
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name='channelDetails'
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>

          </Modal.Content>
        
          <Modal.Actions>
            <Button color='green' inverted onClick = {this.handleSubmit}>
              <Icon name='check'/> Add
            </Button>

            <Button color='red' inverted onClick = {this.closeModal}>
              <Icon name='remove'/> Cancel
            </Button>
          </Modal.Actions>
        </Modal>

      </Menu.Menu>
      </React.Fragment>
    )
  }
}

export default connect(null,{setCurrentChannel})(Channels);