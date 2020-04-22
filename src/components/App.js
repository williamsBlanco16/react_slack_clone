import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react'
import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Message/Message'
import MetaPanel from './MetaPanel/MetaPanel'

class App extends Component {
  render() {
    return (
      <Grid>
        <ColorPanel/>
        <SidePanel/>
        <Messages/>
        <MetaPanel/>
      </Grid>
    );
  }
}

export default App;
