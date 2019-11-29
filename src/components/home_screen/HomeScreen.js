import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
// import {Link, RichText, Date} from 'prismic-reactjs';

class HomeScreen extends Component {

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            todoList Maker
                        </div>
                        
                        <div className="home_new_list_container center-align">
                                <button className="home_new_list_button border cursor" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleNewList = () => {
        const fireStore = getFirestore();
        var link = null;

        console.log("Creating new list")
        fireStore.collection('todoLists').add({
            name: "Unknown",
            owner: "Unknown",
            items:[],
            timestamp: Date.now()
        })

        // return <Redirect to="/login"/>;
        
        .then(docRef => {
            link = docRef.id
            window.location.href = "/todoList/" + docRef.id;
            window.location.replace("/todoList/" + docRef.id)
        }).catch(error => {
            console.log(error);
        })

        // return <Redirect to ="/todoLists/" + link/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.ordered.todoLists,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
    //   { collection: 'todoLists'},
      { collection: 'todoLists', orderBy: ['timestamp', 'desc']},
    ]),
)(HomeScreen);