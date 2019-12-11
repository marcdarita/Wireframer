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
    }

    handleChange = (e) => {
        // const { target } = e;

        // this.setState(state => ({
        //     ...state,
        //     [target.id]: target.value,
        // }));
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
            height: 100,
            width: 100,
            text: "",
            font_size: 14,
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newContainer});

        // var newControls = this.props.wireframe.controls;
        // newControls.push(newContainer)
        // const firestore = getFirestore();
        // firestore.collection('wireframes').doc(this.props.wireframe.id).update({
        //     controls: newControls
        // });
    }

    addLabel = () => {
        var newLabel = {
            control_name: "Label",
            height: 50,
            width: 50,
            text: "",
            font_size: 14,
            background_color: "#ffffff",
            border_color: "#ffffff",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newLabel});

        // var newControls = this.props.wireframe.controls;
        // newControls.push(newLabel)
        // const firestore = getFirestore();
        // firestore.collection('wireframes').doc(this.props.wireframe.id).update({
        //     controls: newControls
        // });
    }
    addButton = () => {
        var newButton = {
            control_name: "Button",
            height: 50,
            width: 50,
            text: "",
            font_size: 14,
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newButton});

        // var newControls = this.props.wireframe.controls;
        // newControls.push(newButton)
        // const firestore = getFirestore();
        // firestore.collection('wireframes').doc(this.props.wireframe.id).update({
        //     controls: newControls
        // });
    }
    addTextfield = () => {
        var newTextField = {
            control_name: "TextField",
            height: 50,
            width: 50,
            text: "",
            font_size: 12,
            background_color: "#ffffff",
            border_color: "#000000",
            border_width: 2,
            border_radius: 0,
        }

        this.setState({focusedControl: newTextField});

        // var newControls = this.props.wireframe.controls;
        // newControls.push(newTextField)
        // const firestore = getFirestore();
        // firestore.collection('wireframes').doc(this.props.wireframe.id).update({
        //     controls: newControls
        // });
    }

    updateControlFocus = (c) => {
        // console.log(c);
        // console.log(c.control_name)\
        this.setState({focusedControl: c});
    }

    rightPanel = () => {
        if (this.state.currentControl === "Container")
            {return <ControlerProps></ControlerProps>}
        else if (this.state.currentControl === "Label")
            {return <LabelProps></LabelProps>}
        else if (this.state.currentControl === "Button")
            {return <ButtonProps></ButtonProps>}
        else if (this.state.currentControl === "Textfield")
            {return <TextfieldProps></TextfieldProps>}
        else
            {return <h1>NULL</h1>}
    }

    updateDiagramDimensions = () => {
        var height = document.getElementById("dimHeight").value;
        var width = document.getElementById("dimWidth").value;
        console.log("Updating dimensions: " + height + ", " + width);
        var element = document.getElementById("diagram");
        element.style.height = height + "px";
        element.style.width = width + "px";
    }

    openModal = () => {
        document.getElementById("myModal").style.display = "block";
    }
    closeModal = () => {
        document.getElementById("myModal").style.display = "none";
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

            // const saveButton = 
            // <Button className = "waves-effect waves-light btn-flat btn-floating btn-large center-align light-green lighten-3">
            //     Save
            // </Button>

        return (
            
            <div className = "row editscreen">

                {/* <Modal header="Your work has been saved!" trigger={saveButton} className = "border">
                </Modal> */}
                <div className = "col s3 controlpanel">

                    <div className = "row subpanel">
                        <span className = "col s4">
                            <i class="material-icons small">zoom_in</i>
                            &nbsp;
                            <i class="material-icons small">zoom_out</i>
                        </span>
                        <span className = "col s8">
                            <a class="waves-effect waves-grey btn-flat button modal-trigger" onClick={this.openModal}>Save</a>

                            <div id="myModal" class="modal">
                                <div class="modal-content">
                                    <span class="close" onClick = {this.closeModal}>&times;</span>
                                    <p>Your diagram has been saved!</p>
                                </div>
                            </div>
                            
                            {/* <button data-target="saveModal"className = "btn modal-trigger">Save</button> */}
                            &nbsp;&nbsp;
                            <a class="waves-effect waves-grey btn-flat button">Close</a>
                        </span>
                    </div>

                    <div className = "center-align buttonI grey lighten-2 hoverable" onClick = {this.addContainer}>
                        <i class="material-icons large">crop_landscape</i>
                        <br></br>
                        <span className = "tag"><b>Container</b></span>
                        {/* <h5>Container</h5> */}
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
                        <a class="waves-effect waves-grey btn-flat button">Submit</a>
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
                    </div>
                    <p></p>
                </div>

                <div className = " col s6 diagram" id = "diagram">
                {controls && controls.map(control => (
                        <div onClick = {() => {this.updateControlFocus(control)}}><ControlCard control={control}/></div>
                ))}
                    {/* <Diagram wireframe = {wireframe}></Diagram> */}
                </div>

                <div className = "col s3 controlpanel">

                    <div className = "left-align">
                        <h5 className = "center-align">Properties</h5>
                        
                        <br></br>
                            <input type = "text" 
                                placeholder = "Text" 
                                value = {this.state.focusedControl.text==="" ? null : this.state.focusedControl.text}
                                onChange = {this.handleChange.bind(this)}>
                            </input>
                        <br></br>
                        <div className = "row">
                            <span className = "left-align">Font Size: &nbsp;
                                <input type = "text" 
                                        name = "font_size"
                                        value = {this.state.focusedControl.font_size}
                                        style = {{width: 50}}
                                        onChange = {this.handleChange.bind(this)}>
                                </input>
                            </span>

                            <br></br>
                            <br></br>

                            <span className = "">Background: &nbsp;</span> 
                                <a class={"btn-flat btn-large waves-effect waves-light buttonII"} id = "bgButton" 
                                    style = {{background: this.state.focusedControl.background_color}}>
                                    <span className = "shorttext">{this.state.focusedControl.background_color}</span>
                                </a>

                            <br></br>
                            <br></br>

                            <span>Border Color: &nbsp;</span> 
                                <a class="btn-flat btn-large waves-effect waves-light buttonII" id = "bcButton"
                                    style = {{background: this.state.focusedControl.border_color}}>
                                <span className = "shorttext">{this.state.focusedControl.border_color}</span>
                                </a>

                            <br></br>
                            <br></br>

                            <span>Border Width: &nbsp;
                                <input type = "text"
                                    value = {this.state.focusedControl.border_width} 
                                    style = {{width: 50}}
                                    onChange = {this.handleChange.bind(this)}>
                                </input>
                            </span>

                            <br></br>

                            <span>Border Radius: &nbsp;
                                <input type = "text" 
                                    value = {this.state.focusedControl.border_radius} 
                                    style = {{width: 50}}
                                    onChange = {this.handleChange.bind(this)}>
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
                    {/* <h1>Hello</h1> */}
                    {/* {this.rightPanel()} */}
                    {/* <ControlerProps wireframe = {wireframe} control = {this.state.focusedControl}></ControlerProps> */}
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