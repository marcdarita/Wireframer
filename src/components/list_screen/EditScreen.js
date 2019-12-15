import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Modal, Button} from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import ControlCard from './ControlCard';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { SketchPicker } from 'react-color';
import { Swatches } from 'react-color';
import ResizableRect from 'react-resizable-rotatable-draggable'
import ResizableBox from 'react-resizable-box'
import Resizable from 'react-resizable'
import {Rnd} from 'react-rnd'
import ReactTooltip from 'react-tooltip'
import { Tooltip } from '@material-ui/core';


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
            font_color: "",
            background_color: "",
            border_color: "",
            border_width: 2,
            border_radius: 0,
            x_coord: 0,
            y_coord: 0,

        },
        controls: [],
        // controls: this.props.wireframe.controls,
        diagramwidth: 450,
        diagramheight: 450,
        
        saved: true,

        displayBGColorPicker: false,
        displayBCColorPicker: false,
        displayFColorPicker: false,
        focusColor: "",
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
          },    
    }

    updateName = (e) => {
        const { target } = e;
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            name: target.value,
        });
    }

    updateOwner = (e) => {
        const { target } = e;
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            owner: target.value,
        });
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
            font_color: "#111111",
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
            x_coord: 0,
            y_coord: 0,
        }

        var newControls = this.props.wireframe.controls;
        newControls.push(newContainer);
        this.setState({controls: newControls});

        this.setState({focusedControl: newContainer});
        this.setState({saved: false}) // Implies that changes have been made
    }
    addLabel = () => {
        var newLabel = {
            control_name: "Label",
            height: 50,
            width: 50,
            text: "Label",
            font_size: 20,
            font_color: "#111111",
            background_color: "#ffffff",
            border_color: "#ffffff",
            border_width: 2,
            border_radius: 0,
            x_coord: 0,
            y_coord: 0,
        }

        var newControls = this.props.wireframe.controls;
        newControls.push(newLabel);
        this.setState({controls: newControls});

        this.setState({focusedControl: newLabel});
        this.setState({saved: false}) // Implies that changes have been made
    }
    addButton = () => {
        var newButton = {
            control_name: "Button",
            height: 30,
            width: 70,
            text: "Submit",
            font_size: 14,
            font_color: "#111111",
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
            x_coord: 0,
            y_coord: 0,
        }

        var newControls = this.props.wireframe.controls;
        newControls.push(newButton);
        this.setState({controls: newControls});

        this.setState({focusedControl: newButton});
        this.setState({saved: false}) // Implies that changes have been made
    }
    addTextfield = () => {
        var newTextField = {
            control_name: "TextField",
            height: 20,
            width: 100,
            text: "Text",
            font_size: 12,
            font_color: "#111111",
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
            x_coord: 0,
            y_coord: 0,
        }

        var newControls = this.props.wireframe.controls;
        newControls.push(newTextField);
        this.setState({controls: newControls});

        this.setState({focusedControl: newTextField});
        this.setState({saved: false}) // Implies that changes have been made
    }

    updateControlFocus = (c, e) => { // c is control, e is event
        e.stopPropagation();
        this.setState({focusedControl: c});
        // document.getElementById("duplicate").disabled = false;
        // document.getElementById("delete").disabled = false;

        document.body.addEventListener("keydown", this.onKeyPressed);
    }
    removeFocus = () => {
        
        document.body.removeEventListener("keydown", this.onKeyPressed);
        var newFocusedControl = {
            control_name: "",
            height: 50,
            width: 50,
            text: "",
            font_size: 14,
            font_color: "",
            background_color: "",
            border_color: "",
            border_width: 2,
            border_radius: 0,
            x_coord: 0,
            y_coord: 0,
        }

        if (this.state.focusedControl != newFocusedControl) {
            this.setState({focusedControl: newFocusedControl});
            // document.getElementById("duplicate").disabled = true;
            // document.getElementById("delete").disabled = true;
        }
        else 
            {return;}
    }

    updateDiagramDimensions = () => {
        var height = document.getElementById("dimHeight").value;
        var width = document.getElementById("dimWidth").value;
        console.log("Updating dimensions: " + height + ", " + width);
        var element = document.getElementById("workspace");
        element.style.height = height + "px";
        element.style.width = width + "px";

        this.setState({diagramheight: height});
        this.setState({diagramwidth: width});

        this.setState({saved: false}); // Implies that changes have been made
    }

    saveModal = () => {
        document.getElementById("saveModal").style.display = "block";

        const firestore = getFirestore();
        firestore.collection('wireframes').doc(this.props.wireframe.id).update({
            controls: this.props.wireframe.controls,
            diagramheight: this.state.diagramheight,
            diagramwidth: this.state.diagramwidth
        })

        this.setState({saved: true}) // Has been saved. Safe to exit
    }
    closeSaveModal = () => {
        document.getElementById("saveModal").style.display = "none";
    }
    closeModal = () => {
        if (this.state.saved == false)
            {document.getElementById("closeModal").style.display = "block";}
        else 
            {return <Redirect to ="/"/>}
    }
    closeCloseModal = () => {
        document.getElementById("closeModal").style.display = "none";
    }
    invalidFS = (e) => {
        var x=e.which;
        if((x>=48 && x<=57) || x==8 || (x>=35 && x<=40) || x==46)
            {return true;}
        else {
            document.getElementById("invalidInput").style.display = "block";
            document.getElementById("fs").value = null
        }
    }
    invalidBW = (e) => {
        var x=e.which;
        if((x>=48 && x<=57) || x==8 || (x>=35 && x<=40) || x==46)
            {return true;}
        else {
            document.getElementById("invalidInput").style.display = "block";
            document.getElementById("bw").value = null
        }
    }
    invalidBR = (e) => {
        var x=e.which;
        if((x>=48 && x<=57) || x==8 || (x>=35 && x<=40) || x==46)
            {return true;}
        else {
            document.getElementById("invalidInput").style.display = "block";
            document.getElementById("br").value = null
        }
    }
    closeInvalidInput = () => {
        document.getElementById("invalidInput").style.display = "none";
    }

    openBGColorPicker = () => {
        this.setState({ displayBGColorPicker: !this.state.displayBGColorPicker });
    }
    closeBGColorPicker = () => {
        this.setState({ displayBGColorPicker: false });
    }
    updateBGColor = (color) => {
        this.setState({ color: color.rgb })
        this.setState({focusColor: color.hex});

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusColor,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl})

        this.setState({saved: false}) // Implies that changes have been made
    }
    openBCColorPicker = () => {
        this.setState({ displayBCColorPicker: !this.state.displayBCColorPicker });
    }
    closeBCColorPicker = () => {
        this.setState({ displayBCColorPicker: false });

    }
    updateBCColor = (color) => {
        this.setState({ color: color.rgb })
        this.setState({focusColor: color.hex});

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusColor,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl})

        this.setState({saved: false}) // Implies that changes have been made
    }
    openFColorPicker = () => {
        this.setState({ displayFColorPicker: !this.state.displayFColorPicker });
    }
    closeFColorPicker = () => {
        this.setState({ displayFColorPicker: false });

    }
    updateFColor = (color) => {
        this.setState({ color: color.rgb })
        this.setState({focusColor: color.hex});

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusColor,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl})

        this.setState({saved: false}) // Implies that changes have been made
    }

    handleTextChange = (e) => {

        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: target.value,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});

        this.setState({saved: false}) // Implies that changes have been made
    }
    handleFSChange = (e) => {
        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: target.value,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});

        this.setState({saved: false}) // Implies that changes have been made
    }
    handleBWidthChange = (e) =>{
        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: target.value,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});

        this.setState({saved: false}) // Implies that changes have been made
    }
    handleBRadiusChange = (e) => {
        const {target} = e;

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: target.value,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});

        this.setState({saved: false}) // Implies that changes have been made
    }

    handleDrag = (e, ui) => {
        console.log("DRAGGED TO: " + ui.x + ", " + ui.y);

        // const { target } = e;

        // console.log(target.style)

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: ui.x,
            y_coord: ui.y,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});

        this.setState({saved: false}) // Implies that changes have been made
    }

    handleChange = () => {
        // const { target } = e;

        // this.setState(state => ({
        //     ...state,
        //     [target.id]: target.value,
        // }));
    }

    zoomIn = () => {
        let workspace = document.getElementById("workspace");
        workspace.style.transform = "scale(2)";
    }
    zoomOut = () => {
        let workspace = document.getElementById("workspace");
        let scale = workspace.style.transform;
        let index = scale.indexOf("(");
        let index2 = scale.indexOf(")");
        scale = scale.slice(index+1, index2);
        scale = parseInt(scale)
        scale = scale - 1;
        let newScale = "scale(" + scale + ")";
        workspace.style.transform = newScale;
    }

    deleteControl = () => {
        console.log("Deleting control");

        if (this.state.focusedControl.control_name === "")
            {return;}

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls.splice(index, 1);

        this.removeFocus();
        // this.setState({focusedControl: updatedControl});

        this.setState({saved: false}) // Implies that changes have been made
    }
    duplicateControl = () => {
        console.log("Duplicating control");

        if (this.state.focusedControl.control_name === "")
            {return;}

        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: this.state.focusedControl.height,
            width: this.state.focusedControl.width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            font_color: this.state.focusedControl.font_color,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord + 100,
            y_coord: this.state.focusedControl.y_coord + 100,
        }

        let newControls = this.props.wireframe.controls;
        newControls.push(updatedControl);

        this.setState({focusedControl: updatedControl});

        this.setState({saved: false}) // Implies that changes have been made
    }

    onKeyPressed = (e) => {
        e.preventDefault();

        if (e.key === 'd' && e.ctrlKey === true)
            {this.duplicateControl()}
        if (e.key === 'Backspace')
            {this.deleteControl()}
    }

    checkDisabled = () => {
        var height = document.getElementById("dimHeight").value
        var width = document.getElementById("dimWidth").value

        if (height === "" | width === "") // Checks if height or width parameters are empty
            {document.getElementById("updateDim").disabled = true;}
        else
            {document.getElementById("updateDim").disabled = false;}
        if ((height < 1 || height > 5000) || (width < 1 || width > 5000)) // Checks if height or width is out of range
            {document.getElementById("updateDim").disabled = true;}
        else
            {document.getElementById("updateDim").disabled = false;}

        for (var i = 0; i < height.length; i++) { // Checks for letters in height parameter
            var code = height.charCodeAt(i);
            if ((code >= 48 && code <= 57) || code==8)
                {}
            else
                {document.getElementById("updateDim").disabled = true;}
        }
        for (var i = 0; i < width.length; i++) { // Checks for letters in width parameter
            var code = width.charCodeAt(i);
            if ((code >= 48 && code <= 57) || code==8)
                {}
            else
                {document.getElementById("updateDim").disabled = true;}
        }
    }

    handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)
        
        var updatedControl = {
            control_name: this.state.focusedControl.control_name,
            height: height,
            width: width,
            text: this.state.focusedControl.text,
            font_size: this.state.focusedControl.font_size,
            background_color: this.state.focusedControl.background_color,
            border_color: this.state.focusedControl.border_color,
            border_width: this.state.focusedControl.border_width,
            border_radius: this.state.focusedControl.border_radius,
            x_coord: this.state.focusedControl.x_coord,
            y_coord: this.state.focusedControl.y_coord,
        }

        let newControls = this.props.wireframe.controls;
        let index = newControls.indexOf(this.state.focusedControl);
        newControls[index] = updatedControl;

        this.setState({focusedControl: updatedControl});

        // this.setState({
        //   top,
        //   left,
        //   width,
        //   height
        // })
        console.log("Resize");
      }

      handleDrag2 = () => {
          console.log("Dragged");
      }
      handleResize2 = () => {
          console.log("Resize");
      }
    render() {

        var preventBackspace = require('prevent-backspace')
        preventBackspace()
        
        // console.log(this.state.focusedControl)

        const auth = this.props.auth;
        const wireframe = this.props.wireframe;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!wireframe)
	        return <React.Fragment />

            var controls = this.props.wireframe.controls;

        return (
            
            <div className = "row editscreen">

                <div className = "col s3 controlpanel">
                
                    <div className = "row">
                    <span>
                        <label>Name</label>
                            <input id = "wireframename" 
                                defaultValue = {this.props.wireframe.name} 
                                onChange = {this.updateName}>
                            </input>
                        <label>Owner</label>
                            <input id = "wireframeowner" 
                                defaultValue = {this.props.wireframe.owner} 
                                onChange = {this.updateOwner}>
                            </input>
                    </span>
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


                <div className = "col s6">
                    <div className = "col s12 controlpanel">
                        <span className = "col s6">
                            <i class="material-icons small cursor" onClick = {this.zoomIn}>zoom_in</i>   
                            <i class="material-icons small cursor" onClick = {this.zoomOut}>zoom_out</i>
                        </span>
                        <span className = "col s6">
                            <a class="waves-effect waves-grey btn-flat button modal-trigger btn-small"
                                onClick = {this.saveModal}><center>Save</center></a>
                            &nbsp;
                            <Link to = {this.state.saved ? "/" : "/wireframe/" + this.props.wireframe.id}>
                                <a class="waves-effect waves-grey btn-flat button btn-small"
                                    onClick = {this.closeModal}
                                    ><center>Close</center></a>
                                </Link>
                        </span>
                    </div>
                    <div id="saveModal" class="modal">
                        <div class="modal-content">
                            <span class="close" onClick = {this.closeSaveModal}>&times;</span>
                            <p>Your diagram has been saved!</p>
                        </div>
                    </div>

                    <div id="closeModal" class="modal">
                        <div class="modal-content">
                            <p>Exit without saving?</p>
                            <br></br>
                            <Link to = "/">
                            <button>Yes</button>&nbsp;
                            </Link>
                            <button onClick = {this.closeCloseModal}>No</button>
                        </div>
                    </div>
                <div className = "col s12"></div>
                <div className = "col s12 diagram" id = "diagram">
                
                    <div id="workspace" className = "col s12" onClick = {this.removeFocus}
                        style = {{width: this.props.wireframe.diagramwidth + "px", height: this.props.wireframe.diagramheight + "px"}}> 
                        {controls && controls.map(control => (
                            // <div onClick = {() => {this.updateControlFocus(control)}}>
                            // <ControlCard control={control} currentFocus={this.state.focusedControl}/>
                            // </div>
                               

                                    // <div onClick = {() => {this.updateControlFocus(control)}}>
                                    //     <ControlCard control={control} currentFocus={this.state.focusedControl}/>
                                    // </div>

                                    // <Rnd 
                                    //     style = {{height: control.height, width: control.width, left: control.x_coord, top: control.x_coord}}
                                    //     // size = {{ width: control.width,  height: control.height }}
                                    //     // position = {{ x: control.x_coord, y: control.y_coord}}
                                    //     default = {{ x: control.x_coord, y: control.y_coord, width: control.width, height: control.height }}
                                    //     onDragStop = {this.handleDrag2}
                                    //     onResizeStop = {this.handleResize}
                                    //     onClick = {this.updateControlFocus.bind(this, control)}
                                    //     // style = {{height: control.height, width: control.width}}
                                    //     >
                                    //         <ControlCard control={control} currentFocus={this.state.focusedControl}/>
                                    // </Rnd>

                                    // <Rnd
                                    // style = {{height: control.height, width: control.width, fontSize: parseInt(control.font_size), color: control.font_color,
                                    //     backgroundColor: control.background_color, borderColor: control.border_color, 
                                    //     borderWidth: parseInt(control.border_width), borderRadius: parseInt(control.border_radius)}}>
                                    //         {control.text}
                                    //     </Rnd>

                                    <Rnd bounds = "parent" onResize = {this.handleResize}
                                        style = {{border: "#111111", borderWidth: "2px", borderStyle: "solid", height: control.height, width: control.width}}>
                                            <ControlCard control={control} currentFocus={this.state.focusedControl}/>
                                    </Rnd>
                                    
                                    // <Resizable
                                    //     width={control.width}
                                    //     height={control.height}
                                    //     onResizeStop = {this.handleResize}>
                                            
                                    // </Resizable>
                                    

                                // <Draggable onStop = {this.handleDrag} 
                                //     defaultPosition = {{x: control.x_coord, y: control.y_coord}}>
                                //     <div 
                                //         onClick = {this.updateControlFocus.bind(this, control)} 
                                //         style = {{height: control.height, width: control.width}}>
                                //         <ControlCard control={control} currentFocus={this.state.focusedControl}/>
                                //     </div>
                                // </Draggable>
                        ))}
                    </div>
                    {/* <Diagram wireframe = {wireframe}></Diagram> */}
                </div>
                </div>

                <div className = "col s3 controlpanel">

                    <div className = "left-align">
                        <h5 className = "center-align">Properties</h5>

                        {/* <center>
                            <button className = "col s6" id = "duplicate" onClick = {this.duplicateControl}>Duplicate</button>
                            <button className = "col s6" id = "delete" onClick = {this.deleteControl}>Delete</button>
                        </center> */}
                        
                            <label>Text Prompt:</label>
                            <input type = "text" 
                                placeholder = {this.state.focusedControl.text==="" ? null : this.state.focusedControl.text}
                                defaultValue = {this.state.focusedControl.text==="" ? null : this.state.focusedControl.text}
                                onKeyUp = {this.handleTextChange.bind(this)}>
                            </input>
                        <br></br>
                        <div className = "row">
                            <span className = "left-align">Font Size: &nbsp;
                                <input type = "number" id = "fs"
                                        name = "font_size"
                                        defaultValue = {this.state.focusedControl.font_size}
                                        style = {{width: 50}}
                                        onChange = {this.handleFSChange.bind(this)}
                                        onKeyUp = {this.invalidFS.bind(this)}>
                                </input>
                            </span>

                            <div id="invalidInput" class="modal">
                                <div class="modal-content">
                                    <span class="close" onClick = {this.closeInvalidInput}>&times;</span>
                                    <p>Please enter a valid input!</p>
                                </div>
                            </div>

                            <br></br>
                            <br></br>

                            <span className = "col s6">Font Color: &nbsp;</span> 
                                    <a class={"btn-flat btn-large waves-effect waves-light buttonII"} id = "fButton" 
                                        style = {{background: this.state.focusedControl.font_color}}
                                        onClick = {this.openFColorPicker}>
                                            <span className = "shorttext">{this.state.focusedControl.font_color}</span>
                                    </a>
                                    { this.state.displayFColorPicker ? <div onMouseLeave = {this.closeFColorPicker}>
                                    <div onClick={ this.closeFColorPicker }/>
                                    <SketchPicker color={ this.state.color } onChange={ this.updateFColor.bind(this) } />
                                    </div> : null }

                            <br></br>
                            <br></br>

                            <span className = "col s6">Background: &nbsp;</span> 
                                    <a class={"btn-flat btn-large waves-effect waves-light buttonII"} id = "bgButton" 
                                        style = {{background: this.state.focusedControl.background_color}}
                                        onClick = {this.openBGColorPicker}>
                                            <span className = "shorttext">{this.state.focusedControl.background_color}</span>
                                    </a>
                                    { this.state.displayBGColorPicker ? <div onMouseLeave = {this.closeBGColorPicker}>
                                    <div onClick={ this.closeBGColorPicker }/>
                                    <SketchPicker color={ this.state.color } onChange={ this.updateBGColor.bind(this) } />
                                    </div> : null }

                            <br></br>
                            <br></br>

                            <span className = "col s6">Border Color: &nbsp;</span> 
                                <a class={"btn-flat btn-large waves-effect waves-light buttonII"} id = "bcButton" 
                                    style = {{background: this.state.focusedControl.border_color}}
                                    onClick = {this.openBCColorPicker}>
                                        <span className = "shorttext">{this.state.focusedControl.border_color}</span>
                                </a>
                                { this.state.displayBCColorPicker ? <div onMouseLeave = {this.closeBCColorPicker}>
                                <div onClick={ this.closeBCColorPicker }/>
                                <SketchPicker color={ this.state.color } onChange={ this.updateBCColor.bind(this) } />
                                </div> : null }

                            <br></br>
                            <br></br>

                            <span>Border Width: &nbsp;
                                <input type = "number" id = "bw"
                                    value = {this.state.focusedControl.border_width} 
                                    style = {{width: 50}}
                                    onChange = {this.handleBWidthChange.bind(this)}
                                    onKeyUp = {this.invalidBW}>
                                </input>
                            </span>

                            <br></br>

                            <span>Border Radius: &nbsp;
                                <input type = "number" id = "br"
                                    value = {this.state.focusedControl.border_radius} 
                                    style = {{width: 50}}
                                    onChange = {this.handleBRadiusChange.bind(this)}
                                    onKeyUp = {this.invalidBR}>
                                </input>
                            </span>

                            <br></br>

                            <center><h5>Diagram Dimensions</h5></center>
                            <span className = "smalltext"><center>(Min: 1, Max: 5000. Whole numbers only)</center></span>

                            Height: &nbsp;
                            <input type = "text" id = "dimHeight" 
                                style = {{width: 50}} 
                                onChange = {this.checkDisabled}
                                placeholder = {this.props.wireframe.diagramheight}>  
                            </input>
                            Width: &nbsp;
                            <input type = "text" id = "dimWidth" 
                                style = {{width: 50}} 
                                onChange = {this.checkDisabled}
                                placeholder = {this.props.wireframe.diagramwidth}>
                            </input>

                            <br></br>

                            <center>
                                <button className = "center-align" id = "updateDim" 
                                        onClick={this.updateDiagramDimensions}>
                                            Update
                                </button>
                            </center>

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