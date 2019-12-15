import React from 'react';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';
import { genericTypeAnnotation } from '@babel/types';
import ResizableRect from 'react-resizable-rotatable-draggable'
import ResizableBox from 'react-resizable-box'
import Resizable from 'react-resizable'
import {Rnd} from 'react-rnd'


{/* <ResizableRect 
                        width={control.width}
                        height={control.height}
                        onResize={this.handleResize}
                        zoomable='n, w, s, e, nw, ne, se, sw'>
                            </ResizableRect> */}


class ControlCard extends React.Component {

    state = {

    }

    handleOnKeyPressed = () => {
        console.log("KeyPressed");
    }

    handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)
        this.props.control.height = height;
        this.props.control.width = width;
        // this.setState({
        //   top,
        //   left,
        //   width,
        //   height
        // })
        console.log("Resize");
      }

      handleDrag = () => {
          console.log("Dragged")
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

       

        else if (control.control_name === "Label") {
            return (
                <div>
                    
                    <label 
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
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
                        style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
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