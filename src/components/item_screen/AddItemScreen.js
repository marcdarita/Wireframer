import React, { Component } from 'react';
import DatePicker from 'react-materialize/lib/DatePicker';
import { getFirestore } from 'redux-firestore';
import { Button, Icon } from 'react-materialize'; 

class AddItemScreen extends Component {
    state = {
        new_description: '',
        new_assigned_to: '',
        new_due_date: '',
        new_completed: false,
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onChangeDate = (date) => {
        var day = date.getDate(); // Day value (DD)
        var year = date.getFullYear(); // Year value (YYYY)
        var month = date.getMonth() + 1; // Month value (MM)

        var new_date = year + '-' + month + '-' + day;
        this.setState({new_due_date: new_date})
    }

    onChangeCompleted = () => {
        this.setState({new_completed: !this.state.new_completed})
    }

    addItem = () => {
        var newList = this.props.location.state.todoList;
        const newItem = {
            "key": this.props.location.state.key,
            "description": this.state.new_description,
            "assigned_to": this.state.new_assigned_to,
            "due_date": this.state.new_due_date,
            "completed": this.state.new_completed
        }

        const firestore = getFirestore();

        newList.items[this.props.location.state.key] = newItem;
        firestore.collection('todoLists').doc(this.props.location.state.todoList.id).update({
            items: newList.items
        });

        this.props.history.goBack();
    }

    render () {
        return (
            <div className="container white row additemscreen">
                <div className="grey-text text-darken-3 light-green lighten-2 center-align border">
                    <h5>Add New Item</h5>
                    <div className = "right-align">
                    </div>
                </div>
                <div className="input-field col s12">
                    <label>Task</label>
                    <input className="active" type="text" name="new_description" id="task" onChange = {this.onChange}/>
                </div>
                <div className="input-field col s12">
                    <label>Assigned To</label>
                    <input className="active" type="text" name="new_assigned_to" id="assigned_to" onChange = {this.onChange}/>
                </div>
                <div className="input-field col s12">
                    <label>Due Date</label>
                    <DatePicker name = "new_due_date" onChange = {this.onChangeDate}></DatePicker>
                </div>
                <div className="input-field col s12">
                <p>
                    <label>
                        <input type="checkbox" name = "new_completed" onChange = {this.onChangeCompleted}/>
                        <span>Completed</span>
                    </label>
                </p>
                </div>
                <p className="center-align col s12">
                    <Button className = "waves-effect waves-light btn light-green lighten-2" onClick = {() => {this.addItem()}}>Add</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button className = "waves-effect waves-light btn light-green lighten-2" onClick = {() => {this.props.history.goBack()}}>Cancel</Button>
                </p>
            </div>
        );
    }
}

export default AddItemScreen;