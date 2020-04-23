import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react'
import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Message/Message'
import MetaPanel from './MetaPanel/MetaPanel'

import{connect} from 'react-redux'

const App = ({currentChannel,currentUser})=>(
  <Grid columns='equal' className='app' style={{backgroud:'#eee'}}>
    <ColorPanel/>
    <SidePanel/>

    <Grid.Column style={{marginLeft: 320}}>
      <Messages 
        key={currentChannel && currentChannel.id} 
        currentChannel={currentChannel}
        currentUser = {currentUser}
      /> 
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel/>
    </Grid.Column>
  </Grid>
);
  


const mapStateToProps = state =>({
  currentChannel: state.channel.currentChannel ,
  currentUser:state.user.currentUser 
})
export default connect(mapStateToProps)(App);
