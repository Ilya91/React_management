import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addNewTask } from '../../AC'
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap'
import moment from 'moment'

class FormTask extends Component {
    state = {
        taskInputOpen: false,
        task: {
            title: '',
            id: '',
            status:{
                value: 0,
                label: ''
            }
        },
        error: null,
        classError: 'has-error'
    }

    handleClick = () => {
        this.setState({
            taskInputOpen: true
        })
    }

    handleSubmit = (e) => {
        const { addNewTask } = this.props
        e.preventDefault()
        if(this.state.task.title !== ''){
            addNewTask(this.state.task)
            this.setState({
                taskInputOpen: false,
                error: null,
                task: {
                    title: '',
                    id: ''
                }
            })
        }else {
            this.setState({
                error: true
            })
        }

    }

    handleChange = (e) => {
        const { projectId, authorId } = this.props
        let today = new Date()
        let options = { month: 'long', day: 'numeric' }
        let date = today.toLocaleDateString("ru-RU", options)
        if(e.target.value.length > 0){
            this.setState({
                error: null
            })
        }
        this.setState({
            task: {
                id: (Date.now()).toString(),
                projectId: projectId ? projectId : null,
                title: e.target.value,
                date: moment().toDate(),
                status:{
                    value: 0,
                    label: ''
                },
                description: '',
                authorId,
                executors:[authorId]
            }
        });
    }


    render(){
        const { taskInputOpen, task:{title}, error, classError } = this.state
        return(
            <div className="taskPanel">
                { taskInputOpen ?
                    <div className={ 'form-group ' + (error ? classError : '') }>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control" onChange={this.handleChange} value={title} autoFocus/>
                    </form>{ error ? 'Input can not be empty!' : '' }

                    </div>:
                    <button onClick={this.handleClick} type="button" className="btn btn-link pull-left">
                        <i className="fa fa-plus"></i> Новая задача
                    </button>}

            </div>
        )
    }
}
export default connect((state) => ({
    task: state.task,
    authorId: state.auth.user
}), { addNewTask })(FormTask)