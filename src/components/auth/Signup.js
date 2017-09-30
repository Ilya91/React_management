import React, { Component } from 'react';
import { signupUser } from '../../AC'
import {connect} from 'react-redux'
import Form from './Form'
import './auth.css'

class Signup extends Component {
    submit = (values) => {
        const { signupUser } = this.props
        signupUser(values)
    }
    render() {
        return (
            <div className="login-box">
              <div className="login-box-body">
                <div className="login-logo">
                  <img src="/public/dist/img/logo-white.png" alt=""/>
                </div>
            <Form onSubmit={this.submit} />
              </div>
            </div>
        )
    }
}

export default connect(null, { signupUser })(Signup)
