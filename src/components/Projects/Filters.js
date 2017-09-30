import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import '../MyWork/Content.css'
import './style.css'
import { connect } from 'react-redux'
import Select from 'react-select'

const options = [
    { value: 0, label: "Любой", color: '#fff', border: '1px solid #2196F3'},
    { value: 1, label: "Активна", color: '#2196F3', border: 'none'},
    { value: 2, label: 'Завершена', color: '#8CC34B', border: 'none' },
    { value: 3, label: 'Отложена', color: '#673BB7', border: 'none' },
    { value: 4, label: 'Отменена', color: '#9E9E9E', border: 'none' }
]

const options2 = [
    { id: 0, label: "Все"}
]


class Filters extends Component {

    getUsersForOptions = () => {
        const { users } = this.props
        return options2.concat(users)
    }
    state = {
        tabIndex: 0,
        selected: 0,
        selectedUser: { id: 0, name: "Все"}
    }
    logChange = (val) => {
        this.setState({
            selected: val
        })
        //console.log("Selected: " + JSON.stringify(val))
    }

    logChangeUser = (val) => {
        this.setState({
            selectedUser: val
        })
        //console.log("Selected: " + JSON.stringify(val))
    }

    renderValue(option) {
        return <span key={option.value}>СТАТУС: {option.label}</span>;
    }


    renderOption(option){
        return <span key={option.value}><div className="selectSquare" style={{ backgroundColor: option.color, border: 'none'}}></div>{option.label}</span>;
    }

    renderValueUser(option) {
        return <span key={option.value? option.value : option.id}>ИСПОЛНИТЕЛЬ: {option.label ? option.label : option.name}</span>;
    }


    renderOptionUser(option){
        return <span key={option.value? option.value : option.id}>{option.label ? option.label : option.name}</span>;
    }

    render(){
        const { selected, selectedUser } = this.state
        const { getState } = this.props
        getState(selected, selectedUser)
        return(
            <div className={"project-filters " + this.props.getClassFilters}>
                <ul>
                    <li>
                        <Select
                            style={{ border: 'none'}}
                            name="form-field-name"
                            value={selected}
                            options={options}
                            onChange={this.logChange}
                            clearable={false}
                            placeholder={false}
                            optionRenderer={this.renderOption}
                            valueRenderer={this.renderValue}
                        />
                    </li>

                    <li>
                        <Select
                            style={{ border: 'none'}}
                            name="form-field-name"
                            value={selectedUser}
                            options={this.getUsersForOptions()}
                            onChange={this.logChangeUser}
                            clearable={false}
                            placeholder={false}
                            optionRenderer={this.renderOptionUser}
                            valueRenderer={this.renderValueUser}
                        />
                    </li>
                </ul>
            </div>
        )
    }
}
export default connect((state) => ({
    users: state.users
}), null)(Filters)