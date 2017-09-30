import {arrToMap, mapToArr} from '../helpers'
import {
    LOAD_ALL_SUBTASKS,
    CHANGE_SUB_TASK_TITLE,
    ADD_SUB_TASK_USER
} from '../constants'
export default ( taskState = [], action) => {
    const { type, payload, response } = action
    switch (type) {
        case LOAD_ALL_SUBTASKS:
            return [ ...response.data ]
        case CHANGE_SUB_TASK_TITLE:
            const value = taskState.map(function (subtask) {
                if(subtask.id === payload.id){
                    subtask.title = payload.title
                }
                return subtask
            })
            return value

        case ADD_SUB_TASK_USER:
            taskState = arrToMap(taskState)
            const subtask = taskState[payload.id]
            const newState2 = {
                ...taskState,
                [payload.id]: {
                    ...subtask,
                    users: (subtask.users || []).concat(payload.userId)
                }
            }
            return mapToArr(newState2)
    }
    return taskState
}