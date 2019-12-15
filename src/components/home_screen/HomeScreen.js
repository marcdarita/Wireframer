import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class HomeScreen extends Component {

    // tm = "tm"
    // title = "Wireframer" + this.tm.sup()

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <h4>Recent Work</h4>
                        <WireframeLinks />
                    </div>
                    
                    <div className="col s8">
                        <div className="banner">
                            Wireframer<sup>TM</sup><br />
                            <br></br>
                            
                        </div>
                        
                        <br></br>
                        <div className="home_new_list_container center-align">
                                <button className="home_new_list_button border cursor" onClick={this.handleNewWireframe}>
                                    Create New Wireframe
                                </button>
                                <br></br>
                                <br></br>
                                <span>Database Tester: &nbsp;</span>
                                <Link to ="/databaseTester">
                                    <button>Tester</button>
                                </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    handleNewWireframe = () => {
        const fireStore = getFirestore();
        var link = null;

        console.log("Creating new Wireframe")
        fireStore.collection('wireframes').add({
            name: "Unknown",
            owner: "Unknown",
            controls: [],
            timestamp: Date.now(),
            ownerid: this.props.auth.uid,
        })

        // return <Redirect to="/login"/>;
        
        .then(docRef => {
            link = docRef.id
            window.location.href = "/wireframe/" + docRef.id;
            window.location.replace("/wireframe/" + docRef.id)
        }).catch(error => {
            console.log(error);
        })

        // return <Redirect to ="/wireframes/" + link/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        wireframes: state.firestore.ordered.wireframes,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
    //   { collection: 'wireframes'},
      { collection: 'wireframes', orderBy: ['timestamp', 'desc']},
    ]),
)(HomeScreen);