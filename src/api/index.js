import axios from 'axios'
import {apiPrefix} from '../../server/config.json'

export default {

    /* tasks */
    createTask(data) {
        return axios.post(`${apiPrefix}/tasks`, data);
    },

    deleteTask(id) {
        return axios.delete(`${apiPrefix}/tasks/${id}`);
    },

    updateTask(id, data) {
        return axios.patch(`${apiPrefix}/tasks/${id}`, data);
    },

    /* subtasks */
    createSubTask(data) {
        return axios.post(`${apiPrefix}/subtasks`, data);
    },

    updateSubTask(id, data) {
        return axios.patch(`${apiPrefix}/subtasks/${id}`, data);
    },

    /* projects */
    createProject(data) {
        return axios.post(`${apiPrefix}/projects`, data);
    },

    deleteProject(id) {
        return axios.delete(`${apiPrefix}/projects/${id}`);
    },

    updateProject(id, data) {
        return axios.patch(`${apiPrefix}/projects/${id}`, data);
    }
}
