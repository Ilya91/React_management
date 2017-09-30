import React, { Component } from 'react'
import './Content.css'
import { connect } from 'react-redux'
import Select from 'react-select'
import DayPicker from './DayPicker'
import SubTaskItem from './SubTaskItem'
import 'react-select/dist/react-select.css'
import { deleteTask, changeTaskDetails, addSubTask, addUserToTask } from '../../AC'
import { getUserForTask } from '../functions'
import Moment from 'react-moment'
import moment from 'moment'

const options = [
    { value: 1, label: "Активна", color: '#2196F3', border: 'none'},
    { value: 2, label: 'Завершена', color: '#8CC34B', border: 'none' },
    { value: 3, label: 'Отложена', color: '#673BB7', border: 'none' },
    { value: 4, label: 'Отменена', color: '#9E9E9E', border: 'none' }
]

class Task extends Component {
    state = {
        description: this.props.description
    }

    logChange = (data) => {
        const { id, changeTaskDetails } = this.props
        this.setState({
            selected: data
        })
        const status = {
            status: data
        }
        changeTaskDetails(id, status)

    }
    handleDelete = (e) => {
        e.preventDefault()
        const { id, deleteTask } = this.props
        deleteTask(id)
    }

    handleDescChange = (e) => {
        const description = e.target.value
        this.setState({
            description
        })
    }

    handleEnterDescription = (e) => {
        const { id, changeTaskDetails } = this.props
        e.preventDefault()
        const description = this.state.description
        const data = {
            description
        }
        changeTaskDetails( id, data )
    }

    renderValue(option) {
        return <span key={option.value}><div className="selectSquare" style={{ border: option.border, backgroundColor: option.color}}></div></span>;
    }


    renderOption(option){
        return <span key={option.value}><div className="selectSquare" style={{ backgroundColor: option.color, border: 'none'}}></div>{option.label}</span>;
    }

    handleAddSubTask = () => {
        const { id, addSubTask } = this.props
        this.setState({
            addSubTaskActive: true
        })
        const subtask = {
            id: (Date.now() + Math.random()).toString(),
            taskId: id,
            title: 'New sub task',
            users: []
        }
        addSubTask(subtask)
    }

    getNumberOfSubtasks = () => {
        const { subTasks, id } = this.props
        return subTasks ? subTasks.filter((subTask) =>
            subTask.taskId === id
        ).length : null
    }

    getCompleteValue = () => {
        const { complete } = this.props
        if(complete !== 'undefined'){
            return complete
        }
        return null
    }

    handleAddToProject = (e) => {
        e.preventDefault()
    }

    handleAddProject = (projectId) => (e) => {
        const { id, changeTaskDetails } = this.props
        e.preventDefault()
        const data = {
            projectId
        }
        changeTaskDetails(id, data)
    }

    handleAddUserForTask = (userId) => (e)=> {
        const { id, changeTaskDetails, executors } = this.props
        e.preventDefault()
        if(!executors.includes(userId)){
            let arr = [...executors, userId]
            const data = {
                executors:arr
            }
            changeTaskDetails(id, data)
        }
    }

    getProjectForTask(){
        const { id, projectId, projects } = this.props
        return projectId ? projects.filter((project) =>
            project.id === projectId
        ).map((project) =>
        <span className="projectTitle" key={project.id}>{ project.title }</span>) : null
    }

    render(){
        const {
            id,
            title,
            date,
            status,
            complete:{ to, from, duration },
            subTasks,
            users,
            projects,
            projectId,
            projectDetails,
            authorId,
            executors
        } = this.props
        const { description } = this.state
        const project = this.getProjectForTask()
        return(
                        <section className="col-lg-6">
                            <div className="box box-primary task-description">
                                <div className="header-task">
                                    <div className="task-title-left">
                                        <h2 className="task-title">{ title }</h2>
                                        { !projectDetails ? project : null}
                                        {!projectDetails ? <button data-toggle="dropdown" onClick={this.handleAddToProject} type="button" className="dropdown-toggle btn btn-link pull-left add-project">
                                            <i className="fa fa-plus"></i> { project ? 'Сменить проект' : 'Добавить в папку/проект'}
                                        </button> : null}

                                        <ul className="dropdown-menu dropdownUsers">
                                            <p>Добавьте задачу в проект</p>
                                            { projects ? projects.map((project) =>
                                                <li key={project.id}>
                                                    <a
                                                        href=""
                                                        id={project.id}
                                                        onClick={this.handleAddProject(project.id)}
                                                        //className={ users ? (users.includes(listUser.id) ? 'active' : '') : null}
                                                    >
                                                        <span>{ project.title }</span>
                                                    </a>
                                                </li>
                                            ) : null }

                                        </ul>
                                    </div>
                                    <div className="task-links">
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <span className="glyphicon glyphicon-option-horizontal"></span></button>
                                            <ul className="dropdown-menu">
                                                <li><a href="#" onClick={this.handleDelete}>Удалить задачу</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <table className="panel-task">
                                    <tbody>
                                        <tr>
                                            <td style={{borderRight: '1px solid #E1DFE1', width: '60px'}}>
                                                <Select
                                                    style={{ border: 'none'}}
                                                    name="form-field-name"
                                                    value={status}
                                                    options={options}
                                                    onChange={this.logChange}
                                                    clearable={false}
                                                    placeholder={false}
                                                    optionRenderer={this.renderOption}
                                                    valueComponent={this.valueComponent}
                                                    valueRenderer={this.renderValue}
                                                />
                                            </td>
                                            <td className="task-users">
                                                <ul className="task-users-list">
                                                    { getUserForTask(executors, users).map((user) =>
                                                        <li key={user.id}>
                                                            <img className="img-circle" src="/public/dist/img/avatar04.png" alt="img"/>
                                                            <span>{ user.login }</span>
                                                        </li>
                                                    )}
                                                </ul>

                                                <span data-toggle="dropdown" className="dropdown-toggle">
                                                    <i className="fa fa-plus"></i>
                                                </span>
                                                <ul className="dropdown-menu dropdownUsers">
                                                    <p>Добавьте пользователя</p>
                                                    { users ? users.map((listUser) =>
                                                        !executors.includes(listUser.id) ? <li key={listUser.id}>
                                                            <a
                                                                href=""
                                                                id={listUser.id}
                                                                onClick={this.handleAddUserForTask( listUser.id )}
                                                                className={ users ? (users.includes(listUser.id) ? 'active' : '') : null}
                                                                >
                                                                <img className="img-circle" src="/public/dist/img/avatar04.png" alt="img"/>
                                                                <span>{ listUser.login }</span>
                                                            </a>
                                                        </li> : ''
                                                    ) : null }

                                                </ul>
                                            </td>
                                            <td className="task-info">
                                                <p>
                                                    <span>автор: </span>
                                                    <span>{ getUserForTask(authorId, users).map((user) => user.login)}</span>
                                                    , <span><Moment format="HH:mm">{ date }</Moment></span>
                                                </p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan="3">
                                                <div className="taskCalendar">
                                                    <a data-toggle="modal" data-target="#myModal">
                                                        <i className="glyphicon glyphicon-calendar">
                                                        </i> { from && to ? moment(from).format('MMM D') + ' - ' + moment(to).format('MMM D') : moment(date).format('MMM D') }
                                                        { from && to ? ' (' + duration + 'д.)' : '' }
                                                    </a>
                                                </div>
                                                <DayPicker id={ id } complete={this.getCompleteValue()}/>
                                                <div className={"addSubTask"} onClick={this.handleAddSubTask}>
                                                    <span>
                                                        <i className="glyphicon glyphicon-list">
                                                        </i>{ this.getNumberOfSubtasks() > 0  ? this.getNumberOfSubtasks() + ' subtasks' : 'Добавить подзадачу'}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        { subTasks ?
                                            <tr>
                                                <td colSpan="3" id="idListSubs">
                                                        { subTasks ? <ul className="listSubTasks">{subTasks.filter((subTask) =>
                                                            subTask.taskId === id
                                                        ).reverse().map((subTask) =>
                                                            <SubTaskItem
                                                                id={ subTask.id }
                                                                key={ subTask.id }
                                                                title={ subTask.title }
                                                                users={ subTask.users }
                                                                usersList={users}
                                                            />
                                                        )}</ul> : null}
                                                </td>
                                            </tr> : null
                                        }
                                    <tr>
                                        <td colSpan="3">
                                        <form className="task-add-description" onSubmit={this.handleEnterDescription}>
                                            <textarea
                                                onChange={this.handleDescChange}
                                                style={{ resize: 'none' }}
                                                className="form-control"
                                                rows="3"
                                                placeholder="Нажмите, чтобы добавить описание"
                                                value={ description }>
                                            </textarea>
                                            <button  type="submit" className={'btn btn-default pull-right'}>Save</button>
                                        </form>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </section>
        )
    }
}

export default connect((state) => ({
    subTasks: state.subTasks,
    projects: state.projects,
    users: state.users
}), {
    deleteTask,
    changeTaskDetails,
    addSubTask,
    addUserToTask
})(Task)