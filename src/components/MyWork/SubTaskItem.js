import React, { Component } from 'react'
import Moment from 'react-moment'
import { changeSubTaskDetails } from '../../AC'
import {connect} from 'react-redux'

class SubTaskItem extends Component {
    state = {
        isOpenInputTitle: false,
        taskTitle: null
    }

    handleCloseInput = () => {
        this.setState({
            isOpenInputTitle: false
        })
    }
    handleEditTitle = () => {
        this.setState({
            isOpenInputTitle: true
        })
    }

    handleEditSubmit = (e) => {
        const { isOpenInputTitle, taskTitle } = this.state
        const { changeSubTaskDetails, id } = this.props
        e.preventDefault()
        const data = {
            title:taskTitle
        }
        changeSubTaskDetails(id, data)
        this.setState({
            isOpenInputTitle: false
        })
    }

    handleChangeTitle = (e) => {
        this.setState({
            taskTitle: e.target.value
        })
    }

    handleAddUser = (userId) => (e) => {
        const { id, changeSubTaskDetails, users } = this.props
        e.preventDefault()
        if(!users.includes(userId)){
            let arr = [...users, userId]
            const data = {
                users:arr
            }
            changeSubTaskDetails(id, data)
        }
    }

    render(){
        const { id, title, users, onClick, usersList } = this.props
        const { isOpenInputTitle, taskTitle } = this.state
        return(
            <li onClick={onClick} id={id} className="subTaskItem" key={id}>
                <input type="checkbox"/>
                    <span data-toggle="dropdown" className="dropdown-toggle">
                        <i className="fa fa-user-plus"></i>
                    </span>
                        { users ? <ul className="subTaskUsers">
                            { usersList.filter((userList) =>
                                users.includes(userList.id)
                            ).map((userList) =>
                                <li key={userList.id}>
                                    <img className="img-circle" src='/public/dist/img/avatar04.png' alt=""/>
                                    { userList.login }
                                </li>)
                            }
                        </ul> : null
                        }
                    <ul className="dropdown-menu dropdownUsers">
                        <p>Добавьте пользователя</p>
                        { usersList ? usersList.map((listUser) =>
                            <li key={listUser.id}>
                                <a href=""
                                    id={listUser.id}
                                    onClick={this.handleAddUser(listUser.id)}
                                    className={ users ? (users.includes(listUser.id) ? 'active' : '') : null}>
                                    <img className="img-circle" src='/public/dist/img/avatar04.png' alt="img"/>
                                    <span>{ listUser.login }</span>
                                </a>
                            </li>
                        ) : null }

                    </ul>
                <strong  onClick={this.handleEditTitle}>{ title }</strong>
                { isOpenInputTitle ?
                <div className="form-group">
                    <form onSubmit={ this.handleEditSubmit }>
                        <input
                            onChange={ this.handleChangeTitle }
                            className="form-control"
                            type="text"
                            placeholder="Введите название новой задачи"
                            autoFocus
                        />
                    </form>
                    <span onClick={ this.handleCloseInput } className="glyphicon glyphicon-remove-sign"></span>
                </div>
                    : '' }
            </li>
        )
    }

    getClassName = (id) => {
        const { isActive } = this.props
        if(isActive){
            return 'active'
        }
    }
}
export default connect(null, { changeSubTaskDetails })(SubTaskItem)