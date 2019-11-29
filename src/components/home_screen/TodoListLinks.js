import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    render() {
        const todoLists = this.props.todoLists;
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                        <div onClick = {() => {this.updateTimeStamp(todoList)}}><TodoListCard todoList={todoList}/></div>
                    </Link>
                ))}
            </div>
        );
    }

    updateTimeStamp = (list) => {
        var newTimeStamp = Date.now()
        list.timestamp = newTimeStamp;
    
        const firestore = getFirestore();
        firestore.collection("todoLists").doc(list.id).update({
            timestamp: newTimeStamp
        });
    }
    
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);