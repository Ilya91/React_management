import React, { Component } from 'react'
import NotFound from '../routes/NotFound'
import issues from '../routes/issues'
import projects from '../routes/projects'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'

class Root extends Component {
    render(){
        return(
                    <div>
                        <Header/>
                        <Sidebar/>
                        <div className="content-wrapper" style={{height: '100%'}}>
                            <section className="content">
                                <div className="row">
                                    <Switch>
                                        <Route path = "/projects" component = {projects} />
                                        <Route path = "/issues" component = {issues} />
                                        <Route path = "*" component = {NotFound}/>
                                    </Switch>
                                </div>
                            </section>
                        </div>
                    </div>
        )
    }
}
export default Root