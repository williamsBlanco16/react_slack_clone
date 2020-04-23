import React, { Component } from 'react'
import { Segment, Input, Button } from 'semantic-ui-react'

class MessageForm extends Component {
  render() {
    return (
      <Segment>
        <Input
          fluid
          name="message"
          style={{marginBottom:'0.7em'}}
          label={<Button icon={'add'}/>}
          labelPosition="left"
          placeholder="write your message"
        />

        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="add Reply"
            labelPosition="left"
            icon="edit"
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
