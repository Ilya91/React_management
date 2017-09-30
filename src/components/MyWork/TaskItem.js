import React, { Component } from 'react'
import Moment from 'react-moment';

class TaskItem extends Component {

    getTitleProject(){
        const { projectId, projects } = this.props
        let project = projects ? projects.filter((project) => (
            project.id === projectId
        )) : null
        return (project ? project : null)
    }

    render(){
        const { id, title, date, onClick } = this.props
        const titleProject = this.getTitleProject()
        return(
            <li onClick={onClick} id={id} className={this.getClassName()}>
                <img className="img-circle" src="/public/dist/img/avatar04.png" alt="img"/>
                <strong>{ title }</strong>
                { titleProject ? titleProject.map((item) => <span className={'projectTitle'} key={item.id}>{ item.title }</span>) : null}
                <span><Moment format="MMM D">{ date }</Moment></span>
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
export default TaskItem