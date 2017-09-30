import React, { Component } from 'react'
import './Content.css'
import moment from 'moment'
import Moment from 'react-moment';

class OtherDays extends Component {
    render(){
        const { getNumberOfTasks } = this.props
        const startThisWeek = moment().startOf('isoWeek')
        const endThisWeek = moment().endOf('isoWeek')
        const startNextWeek = moment().add(1, 'weeks').startOf('isoWeek')
        const endNextWeek = moment().add(1, 'weeks').endOf('isoWeek')
        const afterNextWeek = moment().add(1, 'weeks').endOf('isoWeek')
        return(
                        <section className="col-lg-4">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">НА ЭТУ НЕДЕЛЮ</h3>
                                    <span className="myWorkData">
                                        <Moment locale="en" format="MMM D">
                                            {startThisWeek}
                                        </Moment> -
                                        <Moment format="MMM D">
                                             {endThisWeek}
                                        </Moment>
                                    </span>
                                    <span className="label label-info pull-right">{ getNumberOfTasks( startThisWeek, endThisWeek) }</span>
                                </div>
                                <div className="box-header">
                                    <h3 className="box-title">НА СЛЕД. НЕДЕЛЮ</h3>
                                    <span className="myWorkData">
                                        <Moment locale="en" format="MMM D">
                                            { startNextWeek }
                                        </Moment> -
                                        <Moment locale="en" format="MMM D">
                                             { endNextWeek }
                                        </Moment>
                                    </span>
                                    <span className="label label-info pull-right">{ getNumberOfTasks( startNextWeek, endNextWeek ) }</span>
                                </div>
                                <div className="box-header">
                                    <h3 className="box-title">ПОЗЖЕ</h3>
                                    <span className="myWorkData">
                                        После <Moment locale="en" format="MMM D">
                                             { afterNextWeek }
                                        </Moment>
                                    </span>
                                    <span className="label label-info pull-right">{ getNumberOfTasks( afterNextWeek, null ) }</span>
                                </div>
                            </div>
                        </section>
        )
    }
}
export default OtherDays