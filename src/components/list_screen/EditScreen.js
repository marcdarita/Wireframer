import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {Modal, Button} from 'react-materialize';
import { getFirestore } from 'redux-firestore';

import { Link } from 'react-router-dom';

class EditScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    updateName = (e) => {
        const { target } = e;
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            name: target.value,
            timestamp: Date.now(),
        });
    }

    updateOwner = (e) => {
        const { target } = e;
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            owner: target.value,
            timestamp: Date.now(),
        });
    }

    deleteList = () => {
        console.log("DELETE");
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).delete();
    }

    doSomething = () => {
        console.log("Something");
    }

    // removeFooter = () => {
    //     var element = document.getElementsByClassName("modal-footer")[0];
    //     if (element)
    //         {element.parentNode.removeChild(element);}
    // }

    render() {
        
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!wireframe)
	        return <React.Fragment />

        // const trashTrigger = 
        // <Button className = "waves-effect waves-light btn-flat btn-floating btn-large center-align light-green lighten-3">
        //     <i class="material-icons">delete</i>
        // </Button>   

        return (
            <div className = "row editscreen">
                <div className = "col s3 controlpanel">
                    <div className = "row subpanel">
                        <span className = "col s4">
                            <i class="material-icons small">zoom_in</i>
                            &nbsp;
                            <i class="material-icons small">zoom_out</i>
                        </span>
                        <span className = "col s8">
                            <a class="waves-effect waves-grey btn-flat button">Save</a>
                            &nbsp;&nbsp;
                            <a class="waves-effect waves-grey btn-flat button">Close</a>
                        </span>
                    </div>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.doSomething}>
                        <i class="material-icons large">crop_landscape</i>
                        <br></br>
                        <span className = "tag"><b>Container</b></span>
                        {/* <h5>Container</h5> */}
                    </div>

                    <br></br>
                    <br></br>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.doSomething}>
                        <span className = "tag">Prompt for input:</span>
                        <br></br>
                        <span className = "tag"><b>Label</b></span>
                    </div>

                    <br></br>
                    <br></br>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.doSomething}>
                        <p></p>
                        <a class="waves-effect waves-grey btn-flat button">Submit</a>
                        <br></br>
                        <span className = "tag"><b>Button</b></span>
                    </div>

                    <br></br>
                    <br></br>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.doSomething}>
                        <p></p>
                    <i class="material-icons medium">format_shapes</i>
                        {/* <input type = "text" placeholder = "Input" style = {{width: 100}} disabled></input> */}
                        <br></br>
                        <span className = "tag"><b>Textfield</b></span>
                    </div>
                    <p></p>
                </div>
                <div className = " col s6 diagram">
                    <h1>Diagram</h1>
                </div>
                <div className = "col s3 controlpanel">
                    <h1>Hello</h1>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframes[id] : null;
//   wireframe.id = id;
if(wireframe)
	wireframe.id = id;

  return {
    wireframe,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(EditScreen);