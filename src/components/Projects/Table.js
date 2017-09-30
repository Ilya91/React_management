import React, { Component } from 'react'
import './Table.css'
import moment from 'moment'
import Moment from 'react-moment';
import { getTasks, getUserForTask, filterTasks } from '../functions'
import { connect } from 'react-redux'

class Table extends Component {

    render(){
        const { filterStatus, filterUsers, tasksStore, projects, users } = this.props
        var i = 1;
        return(
            <table className={'table-view'}  cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <td className={'first-cell'}></td>
                        <td className={'title-cell'}>Заголовок</td>
                        <td className={'third-cell'}>Начало</td>
                        <td className={'four-cell'}>Срок выполне...</td>
                        <td className={'fifth-cell'}>Длите...</td>
                        <td className={'six-cell'}>Статус</td>
                        <td className={'seven-cell'}>Исполнители</td>
                    </tr>
                </thead>
                <tbody>
                <tr><td colSpan={'7'} className={'project-iterator'}>
                { projects ? projects.map((project)  =>
                    <table  key={project.id} cellSpacing="0" cellPadding="0">
                        <tbody>
                        <tr className={'project'}>
                            <td className={'first-cell'}></td>
                            <td className={'title-cell'}>{project.title}</td>
                            <td className={'third-cell'}>
                                {project.dateStart ?
                                <Moment locale="en" format="MMM D, YYYY">
                                    {project.dateStart}
                                </Moment> : ''}
                            </td>
                            <td className={'four-cell'}>
                                {project.dateEnd ?
                                    <Moment locale="en" format="MMM D, YYYY">
                                        {project.dateEnd}
                                    </Moment> : ''}
                            </td>
                            <td className={'fifth-cell'}>{project.dateStart && project.dateEnd ? moment(project.dateEnd).diff(moment(project.dateStart), 'days') + ' д.' : ''}</td>
                            <td className={'six-cell'}>{project.status.label}</td>
                            <td className={'seven-cell'}>
                                <ul className={'table-users'}>
                                    { project.executors ? getUserForTask(project.executors, users).map((user) =>
                                        <li key={user.id}>{ user.login }</li>) : ''}
                                </ul>
                            </td>
                        </tr>
                        {getTasks(tasksStore, project.id) ? filterTasks(filterStatus, filterUsers, getTasks(tasksStore, project.id)).map((task) =>
                        <tr key={task.id} className={'task'}>
                            <td className={'first-cell first-cell-task'}>{i++}</td>
                            <td><div className={'task-table-title'}><span>&mdash;</span>{task.title}</div></td>
                            <td className={'third-cell'}>{task.complete ? <Moment locale="en" format="MMM D, YYYY">
                                {task.complete.from}
                            </Moment> : ''}</td>
                            <td  className={'four-cell'}>{task.complete ? <Moment locale="en" format="MMM D, YYYY">
                                {task.complete.to}
                            </Moment> : ''}</td>
                            <td className={'fifth-cell'}>{task.complete ? task.complete.duration + ' д.' : ''}</td>
                            <td className={'six-cell'}>{task.status.label}</td>
                            <td className={'seven-cell'}>
                                <ul className={'table-users'}>{ task.executors ? getUserForTask(task.executors, users).map((user) =>
                                    <li key={user.id}>{ user.login }</li>) : ''}
                                    </ul>
                            </td>
                        </tr>
                    ) : 'task'}</tbody></table>

                    ) : ''}
                </td></tr>
                </tbody>
            </table>
        )
    }
}
export default connect((state) => ({
    tasksStore: state.tasks,
    users: state.users
}), null)(Table)