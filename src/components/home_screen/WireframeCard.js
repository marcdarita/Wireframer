import React from 'react';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';


class WireframeCard extends React.Component {

    render() {

        const { wireframe } = this.props;
        
        // console.log("WireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className = "grey-text text-darken-3 grey lighten-2 hoverable row">
                <div className = "col s10">
                    <span className="card-title" id = "wireframename">{wireframe.name}</span>
                    <br></br>
                    <span id = "wireframeowner">{wireframe.owner}</span>
                </div>
                <div className = "col s2">
                    <i onClick = {this.openDeleteModal.bind(this)} class="material-icons hoverable">clear</i>
                </div>

                <div id="deleteModal" class="modal">
                    <div class="modal-content">
                        <p>Are you sure you will like to delete this Wireframe?</p>
                        <br></br>
                        <button onClick = {this.deleteWireframe.bind(this)}>Yes</button>&nbsp;
                        <button onClick = {this.closeDeleteModal.bind(this)}>No</button>
                    </div>
                </div>

            </div>
        );
    }

    deleteWireframe = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Deleting Wireframe");
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).delete();
    }

    editWireframeInfo = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("EDIT");
    }

    openDeleteModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("deleteModal").style.display = "block";
    }
    closeDeleteModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("deleteModal").style.display = "none";
    }
}
export default WireframeCard;