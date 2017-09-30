import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import { connect } from 'react-redux'
import { changeTaskDetails } from '../../AC'

import 'react-day-picker/lib/style.css';

class Example extends React.Component {
    state = {
        from: null,
        to: null,
        selectedOption: this.someStr()
    }

    someStr(){
        const { complete } = this.props
        if(!complete){
            return 'option'
        }else if(moment().isSame(moment(complete.to), 'day')){
            return 'option1'
        }
    }

    handleDayClick = day => {
        const range = DateUtils.addDayToRange(day, this.state)
        this.setState(range)
    }

    handleResetClick = e => {
        e.preventDefault()
        this.setState({
            from: null,
            to: null,
        })
    }

    handleOptionChange = ( e ) => {
        const option = e.target.value
        const today = new Date()

        switch (option){
            case 'option':
                this.setState({
                    from: null,
                    to: null,
                    selectedOption: 'option'
                })
                return true
            case 'option1':
                this.setState({
                    from: today,
                    to: today,
                    selectedOption: option
                })
                return true

            case 'option2':
                this.setState({
                    from: today,
                    to: moment().add(1, 'days').toDate(),
                    selectedOption: option
                })
                return true

            case 'option3':
                this.setState({
                    from: today,
                    to: moment().add(7, 'days').toDate(),
                    selectedOption: option
                })
                return true
        }
        this.setState({
            selectedOption: option
        });
    }

    render() {
        const { from, to, selectedOption } = this.state
        const { complete } = this.props

        const modifiers = {
            weekends: { daysOfWeek: [6] },
            weekends2: { daysOfWeek: [0] }
        };
        const modifiersStyles = {
            weekends: {
                color: '#000',
                backgroundColor: '#EEEEEE',
            },
            weekends2: {
                color: '#000',
                backgroundColor: '#EEEEEE',
            },
        }

        return (
            <div>

                    <div className="modal" id="myModal" role="dialog">
                    <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title">Когда эта задача должна быть готова?</h4>
                <ul className="optionsWillWork">
                    <form>
                    <li>
                        <input checked={ selectedOption === 'option' }  id="f-option" type="radio" value="option" name="date" onChange={this.handleOptionChange}/>
                        <label htmlFor="f-option">В очереди</label>
                    </li>
                    <li>
                        <input checked={ selectedOption === 'option1' } id="f-option1" type="radio" value="option1" onChange={this.handleOptionChange} name="date"/>
                        <label htmlFor="f-option1">Сегодня</label>
                    </li>
                    <li>
                        <input checked={ selectedOption === 'option2' } id="f-option2" type="radio" value="option2" name="date" onChange={this.handleOptionChange}/>
                        <label htmlFor="f-option2">Завтра</label>
                    </li>
                        <li>
                            <input checked={ selectedOption === 'option3' } id="f-option3" type="radio" value="option3" name="date" onChange={this.handleOptionChange}/>
                            <label htmlFor="f-option3">На след. неделе</label>
                        </li>
                        <li>
                            <input checked={ selectedOption === 'option4' } id="f-option4" type="radio" value="option4" name="date" onChange={this.handleOptionChange}/>
                            <label htmlFor="f-option4">Выбрать дату</label>
                        </li>
                    </form>
                    </ul>
                </div>
                <div className="modal-body">
                    <div className="RangeExample">
                        <table className="modal-table">
                            <thead>
                            <tr>
                                <td>Даты:</td>
                                <td>Длительность:</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <form className="form-inline">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail3"
                                                placeholder="Start"
                                                value={from ? moment(from).format('L') : ''}/>
                                        </div>&#8194;
                                        &#8211; &#8194;<div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputPassword3" placeholder="End" value={to ? moment(to).format('L') : ''}/>
                                    </div>
                                    </form>
                                </td>
                                <td>
                                    <form className="form-inline">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="exampleInputEmail3" value={to && from ? moment(to).diff(moment(from), 'days') + ' дней' : ''}/>
                                        </div>
                                    </form>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <hr/>
                        <DayPicker
                            numberOfMonths={2}
                            selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                            onDayClick={this.handleDayClick}
                            localeUtils={LocaleUtils}
                            locale="ru"
                        />
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.handleClickOk} className="btn btn-primary pull-left" data-dismiss="modal">OK</button>
                        <button type="button" onClick={this.handleResetClick} className="btn btn-default pull-left" data-dismiss="modal">Отмена</button>
                    </div>
                    </div>

                </div>
            </div>
    </div>
        );
    }

    handleClickOk = () => {
        const { changeTaskDetails, id } = this.props
        const { from, to } = this.state
        const duration = moment(to).diff(moment(from), 'days')

        const complete = {
            from,
            to,
            duration
        }
        const data = {
            complete
        }
        changeTaskDetails(id, data)
    }

    getClassName = () => {
        return 'active-tab'
    }
}
export default connect((state) => ({
    activeTask: state.activeTask
}),{ changeTaskDetails })(Example)