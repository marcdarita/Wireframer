import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';

class WireframeLinks extends React.Component {
    render() {
        const wireframes = this.props.wireframes;
        const userid = this.props.auth.uid;
        console.log(wireframes);
        return (
            <div className="section">
                {wireframes && wireframes.filter(wireframe => wireframe.ownerid == userid).map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.id} key={wireframe.id}>
                        <div onClick = {() => {this.updateTimeStamp(wireframe)}}><WireframeCard wireframe={wireframe}/></div>
                    </Link>
                ))}
            </div>
        );
    }

    updateTimeStamp = (list) => {
        var newTimeStamp = Date.now()
        list.timestamp = newTimeStamp;
    
        const firestore = getFirestore();
        firestore.collection("wireframes").doc(list.id).update({
            timestamp: newTimeStamp
        });
    }
    
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);