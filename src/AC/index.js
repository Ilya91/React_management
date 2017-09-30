import {
    LOAD_ALL_PROJECTS,
    SET_ACTIVE_TASK,
    DELETE_NEW_TASK,
    LOAD_ALL_SUBTASKS,
    CHANGE_TASK_STATUS,
    SET_TASK_DATERANGE,
    ADD_SUB_TASK,
    CHANGE_SUB_TASK_TITLE,
    ADD_SUB_TASK_USER,
    LOAD_ALL_TASKS,
    LOAD_ALL_USERS,
    SET_ACTIVE_PROJECT,
    ADD_NEW_PROJECT,
    DELETE_PROJECT,
    ADD_PROJECT_DESCRIPTION,
    CHANGE_PROJECT_STATUS,
    SET_PROJECT_DAY_START,
    SET_PROJECT_DAY_END,
    ADD_TASK_TO_PROJECT,
    ADD_USER_TO_TASK,
    ADD_USER_TO_PROJECT,

    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../constants'

import {push, replace} from 'react-router-redux'
import axios from 'axios'
import api from '../api'
const ROOT_URL = 'http://127.0.0.1:3000'


export function loadAllTasks() {
    return {
        type: LOAD_ALL_TASKS,
        callAPI: `${ROOT_URL}/tasks`
    }
}

export function loadAllUsers() {
    return {
        type: LOAD_ALL_USERS,
        callAPI: `${ROOT_URL}/users`
    }
}

export function loadAllProjects() {
    return {
        type: LOAD_ALL_PROJECTS,
        callAPI: `${ROOT_URL}/projects`
    }
}

export function loadAllSubTasks() {
    return {
        type: LOAD_ALL_SUBTASKS,
        callAPI: `${ROOT_URL}/subtasks`
    }
}


export function addNewTask(task) {
    return function (dispatch) {
        api.createTask(task)
            .then(() => {
                dispatch(
                    {type: LOAD_ALL_TASKS, callAPI: `${ROOT_URL}/tasks`})
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function deleteTask(id) {
    return function (dispatch) {
        api.deleteTask(id)
            .then(() => {
                dispatch({type: LOAD_ALL_TASKS, callAPI: `${ROOT_URL}/tasks`})
                dispatch({type: DELETE_NEW_TASK})
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}
export function changeTaskDetails(id, data) {
    return function (dispatch) {
        api.updateTask(id, data)
            .then(() => {
                dispatch({type: LOAD_ALL_TASKS, callAPI: `${ROOT_URL}/tasks`})
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function addSubTask(subtask) {
    return function (dispatch) {
        api.createSubTask(subtask)
            .then(() => {
                dispatch({type: LOAD_ALL_SUBTASKS, callAPI: `${ROOT_URL}/subtasks`})
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function changeSubTaskDetails(id, data) {
    return function (dispatch) {
        api.updateSubTask(id, data)
            .then(() => {
                dispatch({type: LOAD_ALL_SUBTASKS, callAPI: `${ROOT_URL}/subtasks`})
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function setActiveTask(id) {
    return{
        type: SET_ACTIVE_TASK,
        payload: {
            id
        }
    }
}

export function addUserToTask(id, userId) {
    return{
        type: ADD_USER_TO_TASK,
        payload: {
            id, userId
        }
    }
}


/* projects */
export function setActiveProject(id) {
    return{
        type: SET_ACTIVE_PROJECT,
        payload: {
            id
        }
    }
}

export function addNewProject(project) {
    return function (dispatch) {
        api.createProject(project)
            .then(() => {
                dispatch(
                    {type: LOAD_ALL_PROJECTS, callAPI: `${ROOT_URL}/projects`})
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}
export function deleteProject(id) {
    return function (dispatch) {
        api.deleteProject(id)
            .then(() => {
                dispatch({type: LOAD_ALL_PROJECTS, callAPI: `${ROOT_URL}/projects`})
                dispatch(replace('/projects'))
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function changeProjectDetails(id, data) {
    return function (dispatch) {
        api.updateProject(id, data)
            .then(() => {
                dispatch({type: LOAD_ALL_PROJECTS, callAPI: `${ROOT_URL}/projects`})
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

/*AUTHENTICATION*/
export function signinUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                let id = response.data.id
                dispatch({ type: AUTH_USER, payload:{ id } })
                dispatch({type: LOAD_ALL_USERS, callAPI: `${ROOT_URL}/users`
                })
                dispatch(push('/issues'))
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signupUser({ email, password, login }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password, login })
            .then(response => {
                dispatch({type: UNAUTH_USER})
                dispatch(replace('/signin'))
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    return (dispatch) => {
        dispatch({type: UNAUTH_USER})
        localStorage.removeItem('token')
        dispatch(replace('/signin'))
    }
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    }
}