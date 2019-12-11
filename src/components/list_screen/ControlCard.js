import React from 'react';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';


class ControlCard extends React.Component {

    render() {

        const { control } = this.props;
        
        // console.log("WireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className = "grey-text text-darken-3 grey lighten-2 hoverable row">
                    <span className="card-title col s10">{control.control_name}</span>
                    <i onClick = {this.deleteControl.bind(this)} class="material-icons hoverable col s2">clear</i>
            </div>
        );
    }

    deleteControl = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Deleting Control");
        // const firestore = getFirestore();
    }
}
export default ControlCard;