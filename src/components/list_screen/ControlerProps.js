import React from 'react';
import { Button, Icon } from 'react-materialize'; 
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ControlerProps extends React.Component {
    state = {
        control_name: this.props.control.control_name,
        height: this.props.control.height,
        width: this.props.control.width,
        text: this.props.control.text,
        font_size: this.props.control.font_size,
        background_color: this.props.control.background_color,
        border_color: this.props.control.border_color,
        border_width: this.props.control.border_width,
        border_radius: this.props.control.border_radius,
        
        // control_name: this.props.control===undefined | this.props.control===null ? "" : this.props.control.control_name,
        // height: this.props.control===undefined | this.props.control===null ? 50 : this.props.control.height,
        // width: this.props.control===undefined | this.props.control===null ? 50 : this.props.control.width,
        // text: this.props.control===undefined | this.props.control===null ? "" : this.props.control.text,
        // font_size: this.props.control===undefined | this.props.control===null ? 12 : this.props.control.font_size,
        // background_color: this.props.control===undefined | this.props.control===null ? "" : this.props.control.background_color,
        // border_color: this.props.control===undefined | this.props.control===null ? "" : this.props.control.border_color,
        // border_width: this.props.control===undefined | this.props.control===null ? 2 : this.props.control.border_width,
        // border_radius: this.props.control===undefined | this.props.control===null ? 0 : this.props.control.border_radius,

        // control_name: "",
        // height: 50,
        // width: 50,
        // text: "",
        // font_size: 14,
        // background_color: "",
        // border_color: "",
        // border_width: 2,
        // border_radius: 0,
    }

    updateState = () => {
        if (this.props.control != null) {
            this.setState({control_name: this.props.control.control_name});
            this.setState({height: this.props.control.height});
            this.setState({width: this.props.control.width});
            this.setState({text: this.props.control.text});
            this.setState({font_size: this.props.control.font_size});
            this.setState({background_color: this.props.control.background_color});
            this.setState({border_color: this.props.control.border_color});
            this.setState({border_width: this.props.control.border_width});
            this.setState({border_radius: this.props.control.border_radius});
        }
    }

    handleChange = (e) => {
        const { target } = e;

        console.log(e.value)
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }
    
    render() {
        return (
                <div className = "left-align">
                    <h5 className = "center-align">{this.props.namee}Properties</h5>
                    <br></br>
                        <input type = "text" 
                            placeholder = "Text" 
                            value = {this.state.text==="" ? null : this.state.text}
                            onChange = {this.handleChange.bind(this)}>
                        </input>
                    <br></br>
                    <div className = "row">
                        <span className = "left-align">Font Size: &nbsp;
                            <input type = "text" 
                                    name = "font_size"
                                    value = {this.state.font_size}
                                    style = {{width: 50}}
                                    onChange = {this.handleChange.bind(this)}>
                            </input>
                        </span>

                        <br></br>
                        <br></br>

                        <span className = "">Background: &nbsp;</span> 
                        <a class="btn-floating btn-large waves-effect waves-light white"></a>

                        <br></br>
                        <br></br>

                        <span>Border Color: &nbsp;</span> 
                        <a class="btn-floating btn-large waves-effect waves-light white"></a>

                        <br></br>
                        <br></br>

                        <span>Border Width: &nbsp;
                            <input type = "text"
                                 value = {this.state.border_width} 
                                 style = {{width: 50}}
                                 onChange = {this.handleChange.bind(this)}>
                            </input>
                        </span>

                        <br></br>

                        <span>Border Radius: &nbsp;
                            <input type = "text" 
                                value = {this.state.border_radius} 
                                style = {{width: 50}}
                                onChange = {this.handleChange.bind(this)}>
                            </input>
                        </span>
                        
                    </div>
                </div>
        );
    }

}
export default ControlerProps;