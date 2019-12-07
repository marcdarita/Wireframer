import React, { Component } from 'react';
import DatePicker from 'react-materialize/lib/DatePicker';
import { getFirestore } from 'redux-firestore';
import { Button, Icon } from 'react-materialize'; 
import { thisExpression } from '@babel/types';

class ItemScreen extends Component {
    state = {
        new_description: this.props.location.state.wireframe.items[this.props.location.state.key].description,
        new_assigned_to: this.props.location.state.wireframe.items[this.props.location.state.key].assigned_to,
        new_due_date: this.props.location.state.wireframe.items[this.props.location.state.key].due_date,
        new_completed: this.props.location.state.wireframe.items[this.props.location.state.key].completed,
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

    onChangeCompleted = (e) => {
        this.setState({new_completed: !this.state.new_completed})
    }

    submitEdit = () => {
        var newList = this.props.location.state.wireframe;
        const newItem = {
            "key": this.props.location.state.key,
            "description": this.state.new_description,
            "assigned_to": this.state.new_assigned_to,
            "due_date": this.state.new_due_date,
            "completed": this.state.new_completed
        }

        newList.items[this.props.location.state.key] = newItem;
        const firestore = getFirestore();
        
        firestore.collection('wireframes').doc(this.props.location.state.wireframe.id).update({
            items: newList.items
        });

        this.props.history.goBack();
    }

    render () {
        var isChecked = ""
        if (this.state.new_completed)
            {isChecked = "checked"}

        const key = this.props.location.state.key;
        const item = this.props.location.state.wireframe.items[key];

        return (
            <div className="container white row itemscreen">
                <div className="grey-text text-darken-3 light-green lighten-2 center-align border">
                    <h5>Edit Item</h5>
                    <div className = "right-align">
                    
                    </div>
                </div>
                <div className="input-field col s12">
                    <label><p>Task</p></label>
                    <input className="active" type="text" name="task" id="task" onChange = {this.onChange} defaultValue = {item.description}/>
                </div>
                <div className="input-field col s12">
                    <label><p>Assigned To</p></label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" onChange = {this.onChange} defaultValue = {item.assigned_to}/>
                </div>
                <div className="input-field col s12">
                    <label>Due Date</label>
                    <DatePicker name = "new_due_date" onChange = {this.onChangeDate} defaultValue = {item.due_date}></DatePicker>
                </div>
                <div className="input-field col s12">
                <p>
                    <label>
                        <input type="checkbox" name = "new_completed" checked = {isChecked} onClick = {this.onChangeCompleted}/>
                        <span>Completed</span>
                    </label>
                </p>
                </div>
                <div className="center-align col s12">
                
                    <p className="center-align col s12">
                    <Button className = "waves-effect waves-light btn light-green lighten-2" onClick = {() => {this.submitEdit()}}>Submit</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button className = "waves-effect waves-light btn light-green lighten-2" onClick = {() => {this.props.history.goBack()}}>Cancel</Button>
                    </p>
                </div>
                
            </div>
        );
    }
}

export default ItemScreen;