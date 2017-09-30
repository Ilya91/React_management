export function getUserForTask(id, users){
    if(Array.isArray(id)){
        return users.filter((user) => id.includes( user.id ))
    }
    return users.filter((user) => user.id === id)
}

export function getTasks(tasks, projectId = null){
    return tasks ? ( projectId ? tasks.filter((task) => (
        task.projectId === projectId
    )) : tasks ) : null
}

export function filterTasks(status = 0, user = 0, tasks) {
    if(status !==0 && user !== 0){
        tasks = tasks.filter((task) => {
            return task.status.value === status && task.executors.includes(user)
        })
    }else if(status === 0 && user !== 0){
        tasks = tasks.filter((task) => {
            return task.executors.includes(user)
        })
    }else if(status !==0 && user === 0){
        tasks = tasks.filter((task) => {
            return task.status.value === status
        })
    }else {
        return tasks
    }
    return tasks
}

export function getActiveUser(users, id){
    return users.filter((user) => (
        user.id === id
    ))[0]
}