import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Modal, Button} from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import ControlerProps from './ControlerProps';
import LabelProps from './LabelProps';
import ButtonProps from './ButtonProps';
import TextfieldProps from './TextfieldProps';
import Diagram from './Diagram';
import ControlCard from './ControlCard';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { SketchPicker } from 'react-color';
import { Swatches } from 'react-color';

class EditScreen extends Component {
    state = {
        name: '',
        owner: '',
        currentControl: 'Container',
        focusedControl: {
            control_name: "",
            height: 50,
            width: 50,
            text: "",
            font_size: 14,
            background_color: "N/A",
            border_color: "N/A",
            border_width: 2,
            border_radius: 0,
        },
        controls: [],
        focusColor: "",
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

    switchToContainer = () => {
        this.setState({currentControl: "Container"});
    }
    switchToLabel = () => {
        this.setState({currentControl: "Label"});
    }
    switchToButton = () => {
        this.setState({currentControl: "Button"});
    }
    switchToTextfield = () => {
        this.setState({currentControl: "Textfield"});
    }

    addContainer = () => {
        var newContainer = {
            control_name: "Container",
            height: 300,
            width: 300,
            text: "",
            font_size: 14,
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newContainer});

        var newControls = this.props.wireframe.controls;
        newControls.push(newContainer)
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            controls: newControls
        });
    }
    addLabel = () => {
        var newLabel = {
            control_name: "Label",
            height: 50,
            width: 50,
            text: "",
            font_size: 20,
            background_color: "#ffffff",
            border_color: "#ffffff",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newLabel});

        var newControls = this.props.wireframe.controls;
        newControls.push(newLabel)
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            controls: newControls
        });
    }
    addButton = () => {
        var newButton = {
            control_name: "Button",
            height: 30,
            width: 70,
            text: "",
            font_size: 14,
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newButton});

        var newControls = this.props.wireframe.controls;
        newControls.push(newButton)
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            controls: newControls
        });
    }
    addTextfield = () => {
        var newTextField = {
            control_name: "TextField",
            height: 20,
            width: 100,
            text: "",
            font_size: 12,
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newTextField});

        var newControls = this.props.wireframe.controls;
        newControls.push(newTextField)
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            controls: newControls
        });
    }

    updateControlFocus = (c) => {
        // console.log(c);
        // console.log(c.control_name)\
        this.setState({focusedControl: c});
        
    }

    updateDiagramDimensions = () => {
        var height = document.getElementById("dimHeight").value;
        var width = document.getElementById("dimWidth").value;
        console.log("Updating dimensions: " + height + ", " + width);
        var element = document.getElementById("diagram");
        element.style.height = height + "px";
        element.style.width = width + "px";
    }

    saveModal = () => {
        document.getElementById("saveModal").style.display = "block";

        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            controls: this.props.wireframe.controls
        })
    }
    closeModal = () => {
        document.getElementById("saveModal").style.display = "none";
    }

    openBGColorPicker = () => {
        document.getElementById("bgColorPicker").style.display = "block";
    }
    closeBGColorPicker = () => {
        document.getElementById("bgColorPicker").style.display = "none";
    }
    bgColorSelect = () => {
        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            background_color: this.state.focusColor,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl})
        document.getElementById("bgColorPicker").style.display = "none";
    }   

    openBCColorPicker = () => {
        document.getElementById("bcColorPicker").style.display = "block";
    }
    closeBCColorPicker = () => {
        document.getElementById("bcColorPicker").style.display = "none";
    }
    bcColorSelect = () => {
        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusColor,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl})
        document.getElementById("bcColorPicker").style.display = "none";


    }

    updateFocusColor = (color) => {
        this.setState({focusColor: color.hex});
    }

    handleTextChange = (e) => {

        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: target.value,
            font_size: this.state.focusedControl.font_size,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});
        
        // const { target } = e;

        // this.setState(state => ({
        //     ...state,
        //     [target.id]: target.value,
        // }));
    }

    handleFSChange = (e) => {
        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: target.value,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});
    }

    handleBWidthChange = (e) =>{
        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: target.value,
            border_radius: this.state.focusedControl.border_radius,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});
    }

    handleBRadiusChange = (e) => {
        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: target.value,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});
    }

    handleChange = () => {

    }

    updateText = () => {
        
    }

    zoomIn = () => {
        let workshop = document.getElementById("workshop");
        workshop.style.transform = "scale(2)";
    }
    zoomOut = () => {
        let workshop = document.getElementById("workshop");
        let scale = workshop.style.transform;
        let index = scale.indexOf("(");
        let index2 = scale.indexOf(")");
        scale = scale.slice(index+1, index2);
        scale = parseInt(scale)
        scale = scale - 1;
        let newScale = "scale(" + scale + ")";
        workshop.style.transform = newScale;
    }

    render() {
        
        console.log(this.state.focusedControl)

        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        var controls = this.props.wireframe.controls;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!wireframe)
	        return <React.Fragment />

        return (
            
            <div className = "row editscreen">

                <div className = "col s3 controlpanel">

                    <div className = "row subpanel">
                        <span className = "col s4">
                            <i class="material-icons small" onClick = {this.zoomIn}>zoom_in</i>
                            
                            <i class="material-icons small" onClick = {this.zoomOut}>zoom_out</i>
                        </span>
                        <span className = "col s8">
                            <a class="waves-effect waves-grey btn-flat button modal-trigger btn-small" onClick={this.saveModal}>Save</a>
                            &nbsp;
                            <a class="waves-effect waves-grey btn-flat button btn-small"><center>Close</center></a>
                        </span>
                    </div>

                    <div id="saveModal" class="modal">
                        <div class="modal-content">
                            <span class="close" onClick = {this.closeModal}>&times;</span>
                            <p>Your diagram has been saved!</p>
                        </div>
                    </div>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.addContainer}>
                        <i class="material-icons large">crop_landscape</i>
                        <br></br>
                        <span className = "tag"><b>Container</b></span>
                    </div>

                    <br></br>
                    <br></br>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.addLabel}>
                        <span className = "tag">Prompt for input:</span>
                        <br></br>
                        <span className = "tag"><b>Label</b></span>
                    </div>

                    <br></br>
                    <br></br>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.addButton}>
                        <p></p>
                        <a class="waves-effect waves-grey btn-flat buttonDisplay">Submit</a>
                        <br></br>
                        <span className = "tag"><b>Button</b></span>
                    </div>

                    <br></br>
                    <br></br>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.addTextfield}>
                        <p></p>
                    <i class="material-icons medium">format_shapes</i>
                        {/* <input type = "text" placeholder = "Input" style = {{width: 100}} disabled></input> */}
                        <br></br>
                        <span className = "tag"><b>Textfield</b></span>
                        <p></p>
                    </div>

                    <p></p>
                </div>



                <div className = " col s6 diagram" id = "diagram">
                    <div id="workshop"> 
                        {controls && controls.map(control => (
                                <Draggable>
                                    <div onClick = {() => {this.updateControlFocus(control)}}>
                                        <ControlCard control={control} />
                                    </div>
                                </Draggable>
                        ))}
                    </div>
                    {/* <Diagram wireframe = {wireframe}></Diagram> */}
                </div>

                {/* <div className = " col s6 diagram" id = "diagram">
                {controls && controls.map(function(control) {
                    control.key = controls.indexOf(control);
                    return (
                        <Draggable>
                            <div onClick = {() => {this.updateControlFocus(control)}}>
                                <ControlCard control={control} />
                            </div>
                        </Draggable>
                )})} */}
                    {/* <Diagram wireframe = {wireframe}></Diagram> */}
                {/* </div> */}



                <div className = "col s3 controlpanel">

                    <div className = "left-align">
                        <h5 className = "center-align">Properties</h5>
                        
                        <br></br>
                            <input type = "text" 
                                placeholder = {this.state.focusedControl.text==="" ? null : this.state.focusedControl.text}
                                defaultValue = {this.state.focusedControl.text==="" ? null : this.state.focusedControl.text}
                                onKeyUp = {this.handleTextChange.bind(this)}>
                            </input>
                        <br></br>
                        <div className = "row">
                            <span className = "left-align">Font Size: &nbsp;
                                <input type = "number" 
                                        name = "font_size"
                                        defaultValue = {this.state.focusedControl.font_size}
                                        style = {{width: 50}}
                                        onChange = {this.handleFSChange.bind(this)}>
                                </input>
                            </span>

                            <br></br>
                            <br></br>

                            <span className = "">Background: &nbsp;</span> 
                                <a class={"btn-flat btn-large waves-effect waves-light buttonII"} id = "bgButton" 
                                    style = {{background: this.state.focusedControl.background_color}}
                                    onClick = {this.openBGColorPicker}>
                                    <span className = "shorttext">{this.state.focusedControl.background_color}</span>
                                </a>

                                <div id="bgColorPicker" class="modal fromright">
                                    <div class="modal-content">
                                        <span class="close" onClick = {this.closeBGColorPicker}>&times;</span>
                                        <h5>Background Color</h5>
                                        <p>
                                            <SketchPicker onChangeComplete = {this.updateFocusColor.bind(this)}/>
                                        </p>
                                        <button onClick = {this.bgColorSelect}>Submit</button>
                                    </div>
                                </div>

                            <br></br>
                            <br></br>

                            <span>Border Color: &nbsp;</span> 
                                <a class="btn-flat btn-large waves-effect waves-light buttonII" id = "bcButton"
                                    style = {{background: this.state.focusedControl.border_color}}
                                    onClick = {this.openBCColorPicker}>
                                <span className = "shorttext">{this.state.focusedControl.border_color}</span>
                                </a>

                                <div id="bcColorPicker" class="modal fromright">
                                    <div class="modal-content">
                                        <span class="close" onClick = {this.closeBCColorPicker}>&times;</span>
                                        <h5>Border Color</h5>
                                        <p>
                                            <SketchPicker onChangeComplete = {this.updateFocusColor.bind(this)}/>
                                        </p>
                                        <button onClick = {this.bcColorSelect}>Submit</button>
                                    </div>
                                </div>

                            <br></br>
                            <br></br>

                            <span>Border Width: &nbsp;
                                <input type = "number"
                                    value = {this.state.focusedControl.border_width} 
                                    style = {{width: 50}}
                                    onChange = {this.handleBWidthChange.bind(this)}>
                                </input>
                            </span>

                            <br></br>

                            <span>Border Radius: &nbsp;
                                <input type = "number" 
                                    value = {this.state.focusedControl.border_radius} 
                                    style = {{width: 50}}
                                    onChange = {this.handleBRadiusChange.bind(this)}>
                                </input>
                            </span>

                            <br></br>
                            <br></br>

                            <center><h5>Diagram Dimensions</h5></center>

                            Height: &nbsp;
                            <input type = "text" id = "dimHeight" style = {{width: 50}}></input>
                            Width: &nbsp;
                            <input type = "text" id = "dimWidth" style = {{width: 50}}></input>

                            <br></br>

                            <center><button className = "center-align" onClick={this.updateDiagramDimensions}>Update</button></center>
                            
                            <br></br>

                        </div>
                    </div>
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