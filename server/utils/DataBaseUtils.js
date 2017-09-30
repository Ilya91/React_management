import mongoose from "mongoose"
mongoose.set('debug', true)
import config from '../config.json'
import '../models/Task'
import '../models/User'
import '../models/SubTask'
import '../models/Project'


const Task = mongoose.model('Task')
const User = mongoose.model('User')
const SubTask = mongoose.model('SubTask')
const Project = mongoose.model('Project')

export function setUpConnection() {
    mongoose.Promise = global.Promise
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,{
        useMongoClient: true
    })
}

/* tasks */
export function listTasks() {
    return Task.find()
}

export function createTask(data) {
    const task = new Task({
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        date: data.date,
        status: data.status,
        authorId: data.authorId,
        executors: data.executors,
    });
    return task.save()
}

export function deleteTask(id) {
    return Task.findById(id).remove();
}

export function updateTask(id, data) {
    return Task.findByIdAndUpdate(id, { $set: data }, {new: true})
}

/* users */
export function listUsers() {
    return User.find()
}

export function getUser(status) {
    return User.findOne({status: status}, function(err,obj) { return obj })
}

export function getUserById(id) {
    return User.findById(id, function (err, user) { return user } )
}

export function getUserByIdAndUpdate(id, status) {
    return User.findByIdAndUpdate(id, { $set: { status } }, {new: true})
}


/* subtasks */

export function listSubTasks() {
    return SubTask.find()
}

export function createSubTask(data) {
    const task = new SubTask({
        taskId: data.taskId,
        title: data.title,
        users: data.users
    })
    return task.save()
}

export function updateSubTask(id, data) {
    console.log(id, data)
    return SubTask.findByIdAndUpdate(id, { $set: data }, {new: true})
}

/* projects */

export function listProjects() {
    return Project.find()
}

export function createProject(data) {
    const project = new Project({
        title: data.title,
        date: data.date,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        description: data.description,
        status: data.status,
        executors: data.executors
    })
    return project.save()
}

export function deleteProject(id) {
    return Project.findById(id).remove();
}

export function updateProject(id, data) {
    return Project.findByIdAndUpdate(id, { $set: data }, {new: true})
}