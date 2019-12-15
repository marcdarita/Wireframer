import React from 'react';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';
import { genericTypeAnnotation } from '@babel/types';
import ResizableRect from 'react-resizable-rotatable-draggable'
import ResizableBox from 'react-resizable-box'
import Resizable from 'react-resizable'
import {Rnd} from 'react-rnd'

class ControlCard extends React.Component {

    state = {

    }

    render() {

        const { control } = this.props;
        const currentFocus = this.props.currentFocus;

        if (control.control_name === "Container"  && control === currentFocus) {
            return (
                <div className = "container selectedcontrol" 
                    style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                        backgroundColor: control.background_color, borderColor: control.border_color, 
                        borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>
                        <span className = "TR"></span>
                        <span className = "TL"></span>
                        <span className = "BR"></span>
                        <span className = "BL"></span>
                        {control.text}
                </div>
            );
        }

        else if (control.control_name === "Container") {
            return (
                <div className = "container" 
                    style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                        backgroundColor: control.background_color, borderColor: control.border_color, 
                        borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>

                        {control.text}
                </div>
            );
        }

        else if (control.control_name === "Label" && control === currentFocus) {
            return (
                <div className = "selectedcontrol" style = {{width: control.width, height: control.width}}>
                    <span className = "TR"></span>
                    <span className = "TL"></span>
                    <span className = "BR"></span>
                    <span className = "BL"></span>
                    <label className = ""
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>

                                {control.text}
                    </label>
                    
                </div>  
            )
        }

        else if (control.control_name === "Label") {
            return (
                <div style = {{width: control.width, height: control.width}}> 
                    
                    <label 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>

                                {control.text}
                    </label>
                    
                </div>  
            )
        }

        else if (control.control_name === "Button"  && control === currentFocus) {
            return (
                <div className = "selectedcontrol" style = {{width: control.width, height: control.width}}>
                    <span className = "TR"></span>
                    <span className = "TL"></span>
                    <span className = "BR"></span>
                    <span className = "BL"></span>
                    <button className = "button" 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>
                                
                                {control.text}
                    </button>
                </div>
            )
        }

        else if (control.control_name === "Button") {
            return (
                <div style = {{width: control.width, height: control.width}}>
                    <button className = "button" 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>
                                
                                {control.text}
                    </button>
                </div>
            )
        }

        else if (control.control_name === "TextField" && control === currentFocus) {
            return (
                <div style = {{width: control.width, height: control.width}} className = "selectedcontrol">
                    <span className = "TR"></span>
                    <span className = "TL"></span>
                    <span className = "BR"></span>
                    <span className = "BL"></span>
                    <input type = "text" 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                            backgroundColor: control.background_color, borderColor: control.border_color, 
                            borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}
                        value = {control.text}>        
                    </input>
                </div>
            )
        }

        else if (control.control_name === "TextField") {
            return (
                <div style = {{width: control.width, height: control.width}}>
                    <input type = "text" 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
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