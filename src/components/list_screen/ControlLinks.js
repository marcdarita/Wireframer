import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import ControlCard from './ControlCard';

class ControlLinks extends React.Component {
    render() {
        const controls = this.props.wireframe.controls;
        console.log(controls)
        return (
            <div className="todo-lists section">
                {controls && controls.map(control => (
                        <div><ControlCard control={control}/></div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(ControlLinks);