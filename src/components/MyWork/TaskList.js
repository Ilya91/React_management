import React, { Component } from 'react'
import TaskItem from './TaskItem'
import { connect } from 'react-redux'
import { setActiveTask } from '../../AC'
import moment from 'moment'

class TaskList extends Component {

    handleClickTask = (id) => ev => {
        const { setActiveTask } = this.props
        setActiveTask(id)
    }

    render(){
        const { tasks, activeTask, dateStart, dateEnd } = this.props
        return(
            <div>
                {tasks.map((task) => (
                    dateEnd ? (
                    task.complete ? ( moment(task.complete.to).isBetween(dateStart, dateEnd) ?  <TaskItem
                            onClick={this.handleClickTask(task.id)}
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            date={task.date}
                            isActive={task.id === activeTask}
                        /> : null) : null) : ( task.complete ? null : <TaskItem
                        onClick={this.handleClickTask(task.id)}
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        date={task.date}
                        isActive={task.id === activeTask}
                    />)
                    ))}
            </div>
        )
    }
}
export default connect(state => ({
    activeTask: state.activeTask
}), { setActiveTask })(TaskList)