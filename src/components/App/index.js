import React, { Component } from 'react'
import signin from '../routes/signin'
import root from '../routes/root'
import signup from '../routes/signup'
import signout from '../routes/signout'
import RequireAuth from '../auth/require_auth'
import { connect } from 'react-redux'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import moment from 'moment';
import history from '../../history'
import { ConnectedRouter } from 'react-router-redux'
import { loadAllTasks, loadAllUsers, loadAllSubTasks, loadAllProjects } from '../../AC'

moment.updateLocale('ru', {
    monthsShort : {
        format: 'Янв_Фев_Мар_Апр_Мая_Июня_Июля_Авг_Сен_Окт_Ноя_Дек'.split('_'),
        standalone: 'Янв_Фев_Мар_Апр_Мая_Июнь_Июль_Авг_Сен_Окт_Ноя_Дек'.split('_')
    }
});
moment.locale('ru');

class App extends Component {
    render(){
        return(
                <ConnectedRouter history = {history}>
                    <div>
                        <Switch>
                            <Route path = "/signin" component = {signin} />
                            <Route path = "/signup" component = {signup} />
                            <Route path = "/signout" component = {signout} />
                            <Redirect from='/' to='/issues' exact/>
                            <Route path = "/" component = {RequireAuth(root)} />
                        </Switch>
                    </div>
                </ConnectedRouter>
        )
    }

    componentWillMount() {
        const { loadAllTasks, loadAllUsers, loadAllSubTasks, loadAllProjects } = this.props
        loadAllTasks()
        loadAllUsers()
        loadAllSubTasks()
        loadAllProjects()
    }
}
export default connect(null,{ loadAllTasks, loadAllUsers, loadAllSubTasks, loadAllProjects })(App)