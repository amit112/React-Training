import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import auth from '../services/authService';
class RegisterForm extends Form {
    state = {  data : {email: "" , password:"", name:"" } ,
errors: {} }
    schema  = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }
    doSubmit = async () => {
        const user = {...this.state.data};
        try {
          const { headers } =  await register(user);
          auth.loginWithJwt(headers['x-auth-token']);
          window.location = '/';
        }
        catch (ex) {
        if(ex.response && ex.response.status === 400) {
            const errors = {...this.state.errors};
            errors.email = ex.response.data;
            this.setState({errors});
        }
        }
    }
    render() { 
        return (<div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('email', 'Email')}
                {this.renderInput('password', 'Password' , 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderButton('Submit')}
            </form>
        </div>  );
    }
}
 
export default RegisterForm;