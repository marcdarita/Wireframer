import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './TestData.json'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        wireframeJson.wireframes.forEach(wireframeData => {
            fireStore.collection('wireframes').add({
                    name: wireframeData.name,
                    owner: wireframeData.owner,
                    controls: wireframeData.controls,
                    timestamp: wireframeData.timestamp,
                    diagramheight: wireframeData.diagramheight,
                    diagramwidth: wireframeData.diagramwidth,
                    ownerid: wireframeData.ownerid,
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
                <Link to = "/">
                    <button>Go Home</button>
                </Link>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);