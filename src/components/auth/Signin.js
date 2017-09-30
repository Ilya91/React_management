import React, { Component } from 'react';
import { signinUser } from '../../AC'
import {connect} from 'react-redux'
import Form from './inForm'
import './auth.css'

class Signin extends Component {
    submit = (values) => {
        const { signinUser } = this.props
        signinUser(values)
    }
    render() {
        const { error } = this.props
        return (
            <div className="login-box">
                <div className="login-box-body">
                    <div className="login-logo">
                        <img src="/public/dist/img/logo-white.png" alt=""/>
                    </div>
                    { error ? <span className={'not-valid-email'}>Введите действующий адрес эл.почты</span> : '' }
                    <Form signin={true} onSubmit={this.submit} />
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    error: state.auth.error
}), { signinUser })(Signin)
