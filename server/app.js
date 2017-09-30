import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { ObjectId } from 'mongodb';

import { serverPort } from './config.json';
import * as db from './utils/DataBaseUtils';
import router from './router'


// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection()

app.use(morgan('combined'))
// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }))
router(app)

// RESTful api handlers
/* tasks */
app.get('/tasks', (req, res) => {
    db.listTasks().then(data => res.send(data))
})

app.post('/tasks', (req, res) => {
    db.createTask(req.body).then(data => res.send(data));
})

app.delete('/tasks/:id', (req, res) => {
    db.deleteTask(req.params.id).then(data => res.send(data));
})

app.patch('/tasks/:id', (req, res) => {
    db.updateTask(req.params.id, req.body).then(data => res.send(data));
})


/* users */
app.get('/users', (req, res) => {
    db.listUsers().then(data => res.send(data))
})

app.get('/users/:id', (req, res) => {
    db.getUserById(req.params.id).then(data => res.send(data));
});


/* subtasks */
app.get('/subtasks', (req, res) => {
    db.listSubTasks().then(data => res.send(data))
})

app.post('/subtasks', (req, res) => {
    db.createSubTask(req.body).then(data => res.send(data));
})

app.patch('/subtasks/:id', (req, res) => {
    console.log(req.body)
    db.updateSubTask(req.params.id, req.body).then(data => res.send(data));
})


/* projects */
app.get('/projects', (req, res) => {
    db.listProjects().then(data => res.send(data))
})

app.post('/projects', (req, res) => {
    db.createProject(req.body).then(data => res.send(data));
})

app.delete('/projects/:id', (req, res) => {
    db.deleteProject(req.params.id).then(data => res.send(data));
})

app.patch('/projects/:id', (req, res) => {
    db.updateProject(req.params.id, req.body).then(data => res.send(data));
})


const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
