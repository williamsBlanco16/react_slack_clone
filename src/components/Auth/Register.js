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
import md5 from 'md5'

import firebase from '../../firebase'

class Register extends Component {

  state = {
    userName:'',
    email:'',
    password:'',
    passwordConfirmation:'',
    errors:[],
    loading:false,
    userRef: firebase.database().ref('users')
  }

  formIsValid  = ()=>{
    let errors = [];
    let error;

    if(this.formIsEmpty(this.state)){
      error={message: 'Fill in all fields'}
      this.setState({errors:errors.concat(error)})
      return false;

    }else if(!this.passworIsValid(this.state)){
      error = {message: 'Password is invalid'}
      this.setState({errors:errors.concat(error)})
    }else{
      return true;
    }
  }

  formIsEmpty = ({
    userName,
    email,
    password,
    passwordConfirmation
  })=>{

    return !userName.length || ! email.length || !password.length || !passwordConfirmation.length
  }
  
  displayErrors = errors => errors.map((error,i) => (
    <p key = {i}>{error.message}</p>
  ))

  passworIsValid = ({password, passwordConfirmation})=>{
    if(password.length < 6 || passwordConfirmation.length <6){
      return false;
    }else if(password !== passwordConfirmation){
      return false;
    }else{
      return true;
    }
    
  }
  
  saveUser = createdUser=>{
    return this.state.userRef.child(createdUser.user.uid).set(
      {
        name : createdUser.user.displayName,
        avatar: createdUser.user.photoURL
      }
    )
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

    if(this.formIsValid()){
      this.setState({loading:true, errors:[]})

      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then(createdUser =>{
        console.log(createdUser);
        createdUser.user.updateProfile({
          displayName:this.state.userName,
          photoURL:`https://www.gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        })
        .then(()=>{
          this.saveUser(createdUser)
          .then(()=>{
            this.setState({loading:false})
            console.log('user saved');
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({loading:false, errors: this.state.errors.concat(err)})
        })
      })
      .catch(err => this.setState({loading:false, errors: this.state.errors.concat(err)}))
    }
    
    
  }

  render() {
    const {
      userName,
      email,
      password,
      passwordConfirmation,
      errors,
      loading} = this.state;

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

              <Form.Input 
                fluid name='passwordConfirmation' 
                icon='repeat' 
                iconPosition='left'
                placeholder='Password Confirmation'
                onChange={this.handlerChange }
                type='password'
                value={passwordConfirmation}
                className = {this.handlerInputError(errors,'password')}
              />

              <Button 
                color='orange' 
                fluid size='large'
                className = {loading ? 'loading' : ''}
                disabled = {loading}
                >Submit</Button>

            </Segment>
            <Message>Already a user? <Link to='/login'>login</Link></Message>
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


export default Register;
