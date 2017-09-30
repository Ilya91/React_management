import React, { Component } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {

    getActiveUser(users, id){
        return users.filter((user) => (
            user.id === id
        ))
    }

    render(){
        const { users, id } = this.props
        const user = this.getActiveUser(users, id)
        return(
            <header className="main-header">
                <nav className="navbar navbar-static-top">
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="/public/dist/img/avatar04.png" className="user-image" alt="User Image"/>
                                        <span className="hidden-xs">{user.map((user) => user.login)}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-header">
                                        <img src="/public/dist/img/avatar04.png" className="img-circle" alt="User Image"/>
                                        <span>{user.map((user) => user.login)}</span>
                                    </li>
                                    <li className="user-footer">
                                        <div className="pull-left">
                                            <Link to="/signout" className="btn btn-default btn-flat">Выйти</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}
export default connect((state) => ({
    users: state.users,
    id: state.auth.user
}))(Header)