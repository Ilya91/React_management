import React, { Component } from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import { setActiveProject, setActiveTask, addNewProject } from '../../AC'
import { connect } from 'react-redux'
import moment from 'moment'

class Sidebar extends Component {

    state = {
        inputAddProject: false,
        error: false,
        project: {
            title: '',
            id: '',
            status:0,
            description:''
        }
    }

    handleAddProject = () => {
        const { inputAddProject } = this.state
        if(!inputAddProject){
            this.setState({
                inputAddProject: true
            })
        }else {
            this.setState({
                inputAddProject: false
            })
        }
    }

    handleClick = (id) => ev => {
        const { setActiveProject, setActiveTask } = this.props
        setActiveProject(id)
        setActiveTask(null)
    }

    handleChange = (e) => {
        this.setState({
            project: {
                title: e.target.value,
                date: moment().toDate(),
                status:{
                    value: 0,
                    label:''
                },
                description:''
            },
            error: false
        })

    }
    handleSubmit = (e) => {
        const { addNewProject } = this.props
        const { project } = this.state
        e.preventDefault()
        if(project.title !== ''){
            addNewProject(project)
            this.setState({
                project: {
                    title: '',
                    id: '',
                    date: null
                },
                inputAddProject: false,
                error: false
            })
        }else {
            this.setState({
                error: true
            })
        }
    }

    render(){
        const { inputAddProject, project:{title}, error } = this.state
        const { projects } = this.props
        return(
            <aside className="main-sidebar" style={{height: '100%'}}>
                <section className="sidebar">
                    <div className="searchTasks">
                        <form action="#" method="get" className="sidebar-form">
                            <div className="input-group">
                                <input type="text" name="q" className="form-control" placeholder="Поиск задач..."/>
                            </div>
                        </form>
                    </div>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li>
                            <NavLink
                                onClick={this.handleClick(null)}
                                activeClassName="active"
                                activeStyle = {{backgroundColor: '#5590CC', color: '#fff'}}
                                to="/issues">
                                <i className="fa fa-laptop"></i>
                                Моя работа</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.handleClick(null)} activeClassName="active" activeStyle = {{backgroundColor: '#5590CC', color: '#fff'}} to="/projects">
                                <i className="fa fa-dashboard"></i>Проекты
                                <i className="fa fa-plus pull-right" onClick={this.handleAddProject}></i>
                            </NavLink>
                            <div className="projectList">
                                { inputAddProject ? <div className="addNewProject">
                                    <form onSubmit={this.handleSubmit} className={'form-group' + ( error ? ' has-error' : '')}>
                                        <input type="text" placeholder="Введите название" onChange={this.handleChange} value={title} className={'form-control'}/>
                                    </form>
                                </div> : null }
                                { projects ? <ul>{
                                    projects.map((project) =>
                                        <li key={project.id}>
                                            <NavLink onClick={this.handleClick(project.id)} activeClassName="active" activeStyle = {{backgroundColor: '#5590CC', color: '#fff'}} to = {`/projects/${project.id}`}>
                                                { project.title }
                                            </NavLink>
                                        </li>
                                )}</ul> : null}

                            </div>
                        </li>
                    </ul>

                </section>
            </aside>
        )
    }
}
export default connect((state) => ({
    projects: state.projects
}), { setActiveProject, setActiveTask, addNewProject }, null, { pure: false })(Sidebar)