import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form';
import tasks from './tasks'
import subTasks from './subTasks'
import users from './users'
import projects from './projects'
import activeTask from './activeTask'
import activeProject from './activeProject'
import auth from './auth'

export default combineReducers({
    tasks,
    activeTask,
    subTasks,
    users,
    projects,
    activeProject,
    auth,
    form
})