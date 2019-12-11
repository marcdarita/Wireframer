import React from 'react';
import { Button, Icon } from 'react-materialize'; 
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import ControlLinks from './ControlLinks';
import ControlCard from './ControlCard';

class Diagram extends React.Component {
    
    render() {
        var controls = this.props.wireframe.controls;
        console.log("CONTROLS HERE" + controls);
        return (
                <div><h1>Diagram</h1>

                {controls && controls.map(control => (
                        <div><ControlCard control={control}/></div>
                ))}
                    {/* <ControlLinks wireframe = {wireframe}></ControlLinks> */}
                
                </div>
        );

    }
    
}
export default Diagram;