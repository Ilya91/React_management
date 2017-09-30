import React, { Component } from 'react'
import '../MyWork/Content.css'
import './style.css'
import { connect } from 'react-redux'
import Select from 'react-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'react-select/dist/react-select.css';
import {
    deleteProject,
    setActiveProject,
    changeProjectDetails
} from '../../AC'
import moment from 'moment';
import { getUserForTask } from '../functions'

const DAY_FORMAT = 'DD/MM/YYYY';

const options = [
    { value: 1, label: "Активно", color: '#2196F3', border: 'none'},
    { value: 2, label: 'Завершено', color: '#8CC34B', border: 'none' },
    { value: 3, label: 'Отложено', color: '#673BB7', border: 'none' },
    { value: 4, label: 'Отменено', color: '#9E9E9E', border: 'none' }
];

class ProjectDetails extends Component {
    state = {
        description: this.props.description,
        executors: []
    }

    logChange = (val) => {
        const { project:{id}, changeProjectDetails } = this.props
        const data = {
            status: val
        }
        changeProjectDetails(id, data)
    }
    handleDelete = (e) => {
        e.preventDefault()
        const { project, deleteProject, setActiveProject } = this.props
        setActiveProject(null)
        deleteProject(project.id)
    }

    handleEnterDescription = (e) => {
        const { project:{id}, changeProjectDetails } = this.props
        e.preventDefault()
        const description = this.state.description
        const data = {
            description
        }
        changeProjectDetails( id, data )
    }

    handleProjectDescChange = (e) => {
        let description = e.target.value
        this.setState({
            description
        })
    }

    renderValue(option) {
        return <span key={option.value}><div className="selectSquare" style={{ border: option.border, backgroundColor: option.color}}></div>{option.label}</span>;
    }


    renderOption(option){
        return <span key={option.value}><div className="selectSquare" style={{ backgroundColor: option.color, border: 'none'}}></div>{option.label}</span>;
    }

    handleDayStartChange = (selectedDay) => {
        const { project:{id}, changeProjectDetails } = this.props
        const data = {
            dateStart: selectedDay.toDate()
        }
        changeProjectDetails(id, data)
    }

    handleDayEndChange = (selectedDay) => {
        const { project:{id}, changeProjectDetails } = this.props
        const data = {
            dateEnd: selectedDay.toDate()
        }
        changeProjectDetails(id, data)
    }

    handleAddUser = (userId) => (e) => {
        const { project:{id}, changeProjectDetails, executors } = this.props
        e.preventDefault()
        if(!executors.includes(userId)){
            let arr = [...executors, userId]
            const data = {
                executors:arr
            }
            changeProjectDetails(id, data)
        }
    }

    render(){
        const { description } = this.state
        const { project:{title}, dateStart, dateEnd, status, users, executors } = this.props
        return(
                        <section className="col-lg-6">
                            <div className="box box-primary task-description">
                                <div className="header-task">
                                    <div className="task-title-left">
                                        <h3 className="task-title">{ title ? title : null }</h3>
                                    </div>
                                    <div className="task-links">
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <span className="glyphicon glyphicon-option-horizontal"></span></button>
                                            <ul className="dropdown-menu">
                                                <li><a href="#" onClick={this.handleDelete}>Удалить проект</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <table className="panel-project">
                                    <tbody>
                                    <tr>
                                        <td>
                                        <div className="panel-project-title-item">
                                            <span className='panel-project-title'>Участники</span>
                                            <span className='project-title-divider'>|</span>
                                        </div>
                                        <ul className="project-users-list">
                                            { executors ? getUserForTask(executors, users).map((user) =>
                                                <li key={user.id}>
                                                    <img className="img-circle" src="/public/dist/img/avatar04.png" alt="img"/>
                                                    <span>{ user.login }</span>
                                                </li>
                                            ) : ''}
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
                                                        onClick={this.handleAddUser(listUser.id)}
                                                        className={ users ? (users.includes(listUser.id) ? 'active' : '') : null}
                                                    >
                                                        <img className="img-circle" src="/public/dist/img/avatar04.png" alt="img"/>
                                                        <span>{ listUser.login }</span>
                                                    </a>
                                                </li> : null
                                            ) : null }
                                        </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="panel-project-title-item">
                                                <span className='panel-project-title'>Дата начала проекта</span>
                                                <span className='project-title-divider'>|</span>
                                            </div>
                                            <div className='project-date'>
                                                <DayPickerInput
                                                    format={DAY_FORMAT}
                                                    placeholder="DD/MM/YYYY"
                                                    value={dateStart ? moment(dateStart).format("DD/MM/YYYY") : ''}
                                                    onDayChange={this.handleDayStartChange}
                                                />
                                            </div>
                                            </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <div className="panel-project-title-item">
                                            <span className='panel-project-title'>Дата завершения проекта</span>
                                            <span className='project-title-divider'>|</span>
                                        </div>
                                            <div className='project-date'>
                                                <DayPickerInput
                                                    format={DAY_FORMAT}
                                                    placeholder="DD/MM/YYYY"
                                                    value={dateEnd ? moment(dateEnd).format("DD/MM/YYYY") : ''}
                                                    onDayChange={this.handleDayEndChange}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <div className="panel-project-title-item">
                                            <span className='panel-project-title'>Status</span>
                                            <span className='project-title-divider'>|</span>
                                        </div>
                                            <div className='project-select-status'>
                                                <Select
                                                    style={{ border: 'none'}}
                                                    name="form-field-name"
                                                    value={status}
                                                    options={options}
                                                    onChange={this.logChange}
                                                    clearable={false}
                                                    placeholder={'Change status'}
                                                    optionRenderer={this.renderOption}
                                                    valueComponent={this.valueComponent}
                                                    valueRenderer={this.renderValue}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table className={'form-description-project'}>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <form className="project-add-description"  onSubmit={this.handleEnterDescription}>
                                            <textarea
                                                onChange={this.handleProjectDescChange}
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
    users: state.users
}), {
    deleteProject,
    setActiveProject,
    changeProjectDetails
})(ProjectDetails)