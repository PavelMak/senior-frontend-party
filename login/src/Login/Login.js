import React, {Component} from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from './logo.PNG';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        servers: [],
        redirect: false,
        type: 'password',
        password: '',
        username: '',
        token: ''
    };
}

handleChangeUsername(event) {
  this.setState({username: event.target.value});
}
handleChangePassword(event) {
  this.setState({password: event.target.value});
}
handleSubmit() {
           axios({
            "async": true,
            "crossDomain": true,
            "url": "http://playground.tesonet.lt/v1/tokens",
            "method": "POST",
            "headers": {
              'content-type':'application/json'
            },
            "data": {
              "username": this.state.username,
              "password": this.state.password
            }
            
            }).then(response => {
              localStorage.setItem('AccessToken', 'Bearer ' + response.data.token);
              this.setState({token: response.data.token, redirect: true});
            })
            .catch(error => {
              this.setState({redirect: false}); 
              alert('incorrect');
            });
  }

  handlePasswordVisibility({target}) {
    if(target.checked){
      this.setState({type: 'text'}); 
    }
    else {
      this.setState({type: 'password'}); 
    }
  }

  render() {
    return (
      <div className="Login">
          {this.state.redirect &&
           <Redirect to={{
              pathname: '/Servers',
              token: "Bearer "+this.state.token
            }} />
          }
      
          <form className="Form">
          <img src={logo} alt='TestioLogo' className="img-responsive center-block" />
            <div className="form-group" >
              <input className="form-control form-control-lg glyphicon" type="text" onChange={this.handleChangeUsername.bind(this)} placeholder="&#57352; Username" />
            </div>
            <div className="form-group">
              <input className="form-control form-control-lg glyphicon" type={this.state.type} onChange={this.handleChangePassword.bind(this)} placeholder="&#57395; Password" />
              <div className="passwordVisibility"><input type="checkbox" onChange={this.handlePasswordVisibility.bind(this)} /> Show Password </div>
            </div>
            <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.handleSubmit.bind(this)}>Log In</button>
          </form>
        </div>

    );
  }
}
