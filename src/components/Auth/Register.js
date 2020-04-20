import React, { Component } from 'react'

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react'

import {Link} from 'react-router-dom'

class Register extends Component {

  state = {
    userName:'',
    email:'',
    password:'',
    passwordConfirmation:''
  }

  handlerChange = event => {
    this.setState({[event.target.name]:event.target.value});
  }

  handlerSubmit = event =>{
    event.preventDefault();

    console.log('submit');
  }

  render() {
    const {
      userName,
      email,
      password,
      passwordConfirmation} = this.state;

    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{maxWidth:450}}>
          <Header as='h2' icon color='orange' textAlign='center'>
            <Icon name='puzzle piece' color='orange'/>
              Register for devChat  
          </Header>
          <Form size='large' onSubmit={this.handlerSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid name='userName' 
                icon='user' 
                iconPosition='left'
                placeholder='User name'
                onChange={this.handlerChange }
                type='text'
                value={userName}
              />

              <Form.Input 
                fluid name='email' 
                icon='mail' 
                iconPosition='left'
                placeholder='Email Adress'
                onChange={this.handlerChange }
                type='email'
                value={email}
              />

              <Form.Input 
                fluid name='password' 
                icon='lock' 
                iconPosition='left'
                placeholder='Password '
                onChange={this.handlerChange }
                type='password'
                value={password}
              />  

              <Form.Input 
                fluid name='passwordConfirmation' 
                icon='repeat' 
                iconPosition='left'
                placeholder='Password Confirmation'
                onChange={this.handlerChange }
                type='password'
                value={passwordConfirmation}
              />

              <Button color='orange' fluid size='large'>Submit</Button>
            </Segment>
            <Message>Already a user? <Link to='/login'>login</Link></Message>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}


export default Register;
