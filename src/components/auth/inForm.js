import React, { Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

class Form extends Component{
    render(){
    const { handleSubmit } = this.props
    return (
        <form onSubmit={ handleSubmit }>
            <div className="form-group has-feedback">
                <Field name="email" component="input" type="email" className="form-control" placeholder="Эл. почта" />
            </div>
            <div className="form-group has-feedback">
                <Field name="password" component="input" type="password" className="form-control" placeholder="Пароль" />
            </div>
            <div className="row">
                <div className="col-xs-5  pull-left">
                    <Link to="/signup">Регистрация</Link>
                </div>
                <div className="col-xs-5  pull-right">
                    <button type="submit" className="btn btn-primary btn-block">Вход</button>
                </div>
            </div>
        </form>
    )
}
}

Form = reduxForm({
    form: 'signin'
})(Form)

export default Form;