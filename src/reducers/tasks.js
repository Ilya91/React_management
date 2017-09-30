import {arrToMap, mapToArr} from '../helpers'
import { ADD_NEW_TASK,
        DELETE_NEW_TASK,
        ADD_TASK_DESCRIPTION,
        CHANGE_TASK_STATUS,
        SET_TASK_DATERANGE,
        LOAD_ALL_TASKS,
        ADD_TASK_TO_PROJECT,
        ADD_USER_TO_TASK
} from '../constants'
import { Map, List } from 'immutable'

export default ( taskState = [], action) => {
    const { type, payload, response } = action

    switch (type) {
        case LOAD_ALL_TASKS:
            return [ ...response.data ]
        case ADD_NEW_TASK: return [...taskState, payload.task ]
        /*case DELETE_NEW_TASK: return taskState.filter(task => task.id !== payload.id)*/
        /*case CHANGE_TASK_STATUS:
            const value = taskState.map(function (task) {
                if(task.id === payload.id){
                    task.status = payload.status
                }
                return task
            })
            return value*/
        case ADD_TASK_DESCRIPTION:
            const deep = List(taskState)
            const deep2 = deep.updateIn(["id", payload.data.id], () => payload.data);
            const val = taskState.map(function (task) {
                if(task.id === payload.data.id){
                    task.description = payload.data.desc
                }
                return task
            })
            return val

        case SET_TASK_DATERANGE:
            const val2 = taskState.map(function (task) {
                if(task.id === payload.id){
                    task.complete = payload.complete
                }
                return task
            })
            return val2

        case ADD_TASK_TO_PROJECT:
            taskState = arrToMap(taskState)
            let task = taskState[payload.id]
            const projectId = payload.projectId
            let imm = {
                ...taskState,
                [payload.id]:{
                    ...task, projectId
                }
            }
            return mapToArr(imm)

        case ADD_USER_TO_TASK:
            taskState = arrToMap(taskState)
            let task2 = taskState[payload.id]
            const userId = payload.userId
            let imm2 = {
                ...taskState,
                [payload.id]:{
                    ...task2,
                    executors: (task2.executors || []).concat(userId)
                }
            }
            return mapToArr(imm2)

    }
    return taskState
}