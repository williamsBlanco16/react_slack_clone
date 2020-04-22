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

import firebase from '../../firebase'

class Login extends Component {

  state = {
    email:'',
    password:'',
    errors:[],
    loading:false,
  }

  handlerInputError = (errors, inputName) =>{
    return errors.some(error => error.message.toLowerCase().includes(inputName))
    ?'error'
    :''
  }

  handlerChange = event => {
    this.setState({[event.target.name]:event.target.value});
  }

  handlerSubmit = event =>{
    event.preventDefault();

    if(this.formIsValid(this.state)){
      this.setState({loading:true, errors:[]})

      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser =>{
        this.setState({loading:false})
        console.log(signedInUser)
      })
      .catch(error =>{
        console.error(error);
        this.setState({
          loading:false,
          errors: this.state.errors.concat(error)
        })
      })

    }
  }
  
  formIsValid = ({email,password})=>email && password;

  displayErrors = errors => errors.map((error,i) => (
    <p key = {i}>{error.message}</p>
  ))

  render() {
    const {
      email,
      password,
      errors,
      loading} = this.state;

    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{maxWidth:450}}>
          <Header as='h2' icon color='violet' textAlign='center'>
            <Icon name='code branch' color='violet'/>
              Login to devChat  
          </Header>
          <Form size='large' onSubmit={this.handlerSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid name='email' 
                icon='mail' 
                iconPosition='left'
                placeholder='Email Adress'
                onChange={this.handlerChange }
                type='email'
                value={email}
                className = {this.handlerInputError(errors,'email')}
              />

              <Form.Input 
                fluid name='password' 
                icon='lock' 
                iconPosition='left'
                placeholder='Password '
                onChange={this.handlerChange }
                type='password'
                value={password}
                className = {this.handlerInputError(errors,'password')}
              /> 

              <Button 
                color='violet' 
                fluid size='large'
                className = {loading ? 'loading' : ''}
                disabled = {loading}
                >Submit</Button>

            </Segment>
            <Message>Don't have an account? <Link to='/register'>Register</Link></Message>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}


export default Login;
