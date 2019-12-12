import React from 'react';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';


class ControlCard extends React.Component {

    render() {

        const { control } = this.props;

        if (control.control_name === "Container") {
            return (
                <div className = "container" 
                    style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size),
                        backgroundColor: control.background_color, borderColor: control.border_color, 
                        borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>

                        {control.text}
                </div>
            );
        }

        else if (control.control_name === "Label") {
            return (
                <div>
                    <label 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size),
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>

                                {control.text}
                    </label>
                </div>
            )
        }

        else if (control.control_name === "Button") {
            return (
                <div>
                    <button className = "button" 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size),
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>
                                
                                {control.text}
                    </button>
                </div>
            )
        }

        else if (control.control_name === "TextField") {
            return (
                <div>
                    <input type = "text" 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size),
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}
                        value = {control.text}>         
                    </input>
                </div>
            )
        }

        else {
        
            return (
            <div className = "grey-text text-darken-3 grey lighten-2 hoverable row">
                    <span className="card-title col s10">{control.control_name}</span>
                    <i onClick = {this.deleteControl.bind(this)} class="material-icons hoverable col s2">clear</i>
            </div>
        );
        }
    }

    deleteControl = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Deleting Control");
        // const firestore = getFirestore();
    }
}
export default ControlCard;