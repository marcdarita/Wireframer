import React from 'react';

class WireframeCard extends React.Component {

    render() {

        const { wireframe } = this.props;
        // console.log("WireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className = "grey-text text-darken-3 grey lighten-2 hoverable row">
                    <span className="card-title col s10">{wireframe.name}</span>
                    <i onClick = {this.deleteWireframe.bind(this)} class="material-icons hoverable col s2">clear</i>
            </div>
        );
    }

    deleteWireframe = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Deleting Wireframe");
    }
}
export default WireframeCard;