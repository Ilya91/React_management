import React from 'react'
import Projects from '../Projects/indexProjects'
import Project from '../Projects/Project'
import Item from '../Projects/Item'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

const projects = (props) => (
        <Switch>
            <Route exact path='/projects' component={Projects}/>
            <Route path='/projects/:id' component={Project}/>
        </Switch>
)

export default projects