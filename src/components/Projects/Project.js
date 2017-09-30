import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import '../MyWork/Content.css'
import './style.css'
import './Tab.css'
import ListOfTasks from './ListOfTasks'
import ProjectDetails from './ProjectDetails'
import Table from './Table'
import FormTask from '../MyWork/FormTask'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import moment from 'moment'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Task from '../MyWork/Task'
import Select from 'react-select'
import TimeRange from './TimeRange'


const options = [
    { value: 0, label: "Любой", color: '#fff', border: '1px solid #2196F3'},
    { value: 1, label: "Активна", color: '#2196F3', border: 'none'},
    { value: 2, label: 'Завершена', color: '#8CC34B', border: 'none' },
    { value: 3, label: 'Отложена', color: '#673BB7', border: 'none' },
    { value: 4, label: 'Отменена', color: '#9E9E9E', border: 'none' }
]

const options2 = [
    { id: 0, label: "Все"}
]


class Project extends Component {

    getUsersForOptions = () => {
        const { users } = this.props
        return options2.concat(users)
    }
    state = {
        tabIndex: 0,
        selected: 0,
        selectedUser: { id: 0, login: "Все"}
    }
    logChange = (val) => {
        this.setState({
            selected: val
        })
        //console.log("Selected: " + JSON.stringify(val))
    }

    logChangeUser = (val) => {
        this.setState({
            selectedUser: val
        })
        //console.log("Selected: " + JSON.stringify(val))
    }

    renderValue(option) {
        return <span key={option.value}>СТАТУС: {option.label}</span>;
    }


    renderOption(option){
        return <span key={option.value}><div className="selectSquare" style={{ backgroundColor: option.color, border: 'none'}}></div>{option.label}</span>;
    }

    renderValueUser(option) {
        return <span key={option.value? option.value : option.id}>ИСПОЛНИТЕЛЬ: {option.label ? option.label : option.login}</span>;
    }


    renderOptionUser(option){
        return <span key={option.value? option.value : option.id}>{option.label ? option.label : option.login}</span>;
    }

    getClassTabs = () => {
        const { tabIndex } = this.state
        return tabIndex ? 'leftTabs' : ''
    }

    getClassHeader = () => {
        const { tabIndex } = this.state
        return tabIndex ? 'leftHeader' : ''
    }

    getClassFilters = () => {
        const { tabIndex } = this.state
        return tabIndex ? 'leftFilters' : ''
    }

    getProject(){
        const paramId = this.props.match.params.id
        const { projects } = this.props

        const project = projects.filter((project) =>
            paramId === project.id
        )[0]
        return project
    }

    render(){
        const paramId = this.props.match.params.id
        const { tabIndex, selected, selectedUser } = this.state
        const { activeTask, tasks, projects } = this.props
        const project = this.getProject()
        const projectArr = []
        projectArr.push(project)
        return(
                    <div>
                        <section className={ tabIndex ? "col-lg-12" : "col-lg-6"}>
                            <div className="box box-primary projects">
                                <div className={"box-body " + this.getClassHeader()}>
                                    <h3 className="box-title">{ project ? project.title : null }</h3>
                                </div>
                                <Tabs selectedIndex={tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                    <div className={this.getClassTabs()}>
                                        <TabList>
                                            <Tab>СПИСОК</Tab>
                                            <Tab>ТАБЛИЦА</Tab>
                                            <Tab>ВРЕМЕННАЯ ШКАЛА</Tab>
                                        </TabList>
                                    </div>
                                    <div className={"project-filters " + this.getClassFilters()}>
                                        <ul>
                                            <li>
                                                <Select
                                                    style={{ border: 'none'}}
                                                    name="form-field-name"
                                                    value={selected}
                                                    options={options}
                                                    onChange={this.logChange}
                                                    clearable={false}
                                                    placeholder={false}
                                                    optionRenderer={this.renderOption}
                                                    valueRenderer={this.renderValue}
                                                />
                                            </li>
                                            <li>
                                                <Select
                                                    style={{ border: 'none'}}
                                                    name="form-field-name"
                                                    value={selectedUser}
                                                    options={this.getUsersForOptions()}
                                                    onChange={this.logChangeUser}
                                                    clearable={false}
                                                    placeholder={false}
                                                    optionRenderer={this.renderOptionUser}
                                                    valueRenderer={this.renderValueUser}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <TabPanel>
                                        <FormTask projectId={paramId}/>
                                        <ListOfTasks
                                            filterStatus={this.state.selected.value}
                                            filterUsers={this.state.selectedUser.id}
                                            projectId={paramId}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <Table
                                            projects={projectArr}
                                            projectId={paramId}
                                            filterStatus={this.state.selected.value}
                                            filterUsers={this.state.selectedUser.id}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <TimeRange
                                            projectId={paramId}
                                            filterStatus={this.state.selected.value}
                                            filterUsers={this.state.selectedUser.id}
                                        />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </section>
                        { (tabIndex || activeTask) ? null : (project ? <ProjectDetails
                            project={project}
                            description={project.description}
                            status={project.status}
                            dateStart={project.dateStart}
                            dateEnd={project.dateEnd}
                            executors={project.executors}
                        /> : null)}
                        { (activeTask && !tabIndex) ? tasks.filter((task) =>
                            activeTask === task.id
                        ).map((task) => <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            date={task.date}
                            description={task.description ? task.description : ''}
                            complete={task.complete ? task.complete : ''}
                            status={task.status}
                            projectDetails={true}
                            authorId={task.authorId}
                            executors={task.executors}
                        />) : null }
                    </div>
        )
    }
}
export default connect((state) => ({
    tasks: state.tasks,
    projects: state.projects,
    activeTask: state.activeTask,
    users: state.users
}), null)(Project)