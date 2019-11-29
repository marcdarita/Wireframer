import React from 'react';
import { Button, Icon } from 'react-materialize'; 
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {
    state = {
        itemList: this.props.todoList.items,
    }
    
    render() {

        console.log(this.state.itemList);

        const { item } = this.props;  

        var moveItemUpButton = "blue hoverable";
        var moveItemDownButton = "yellow hoverable";
        var deleteItemButton = "red hoverable";
        if (item.key == 0)
            {moveItemUpButton = "disabled"}
        if (item.key == this.props.todoList.items.length-1)
            {moveItemDownButton = "disabled"}

        return (
           <Link to ={{pathname: "/todoList/" + this.props.todoList.id + "/" + item.key, state: {todoList: this.props.todoList, key: item.key}}}>

            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3 row hoverable">
                    
                    <div className = "col s3 left-align">
                    <span className="card-title">{item.description}</span>
                    <p className = ""><b>{item.assigned_to}</b></p>
                    </div>
                    <p className = "col s3">{item.due_date}</p>
                    <p className = "col s3">{this.isCompleted(item.completed)}</p>

                    <div className = "col s3 right-align">
                    <Button floating fab={{direction: 'left', position: 'relative'}} className="light-green lighten-3 hoverable" large>
                        <Button floating icon={<i class="material-icons">arrow_upward</i>} 
                            className = {moveItemUpButton} medium
                            onClick = {this.itemMoveUp.bind(this)}
                            /> &nbsp;
                        <Button floating icon={<i class="material-icons">arrow_downward</i>} 
                            className = {moveItemDownButton} medium
                            onClick = {this.itemMoveDown.bind(this)}
                            /> &nbsp;
                        <Button floating icon={<i class="material-icons">clear</i>} 
                            className = {deleteItemButton} medium
                            onClick = {this.itemDelete.bind(this)}/>
                    </Button>
                    </div>

                </div>
            </div>
            </Link>
            // btn-floating div fixed-action-btn horizontal
        );
    }

    isCompleted = (value) => {
        if (value){
            return (<p className = "green-text">Completed </p>)
        }
        else {
            return (<p className = "red-text">Pending </p>)
        }
    }

    itemMoveUp = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        console.log("MOVING ITEM UP");

        if (this.props.item.key <= 0) // If item is at top of list
            {return;}
        
        var list = this.props.todoList;
        var item1 = list.items[this.props.item.key];
        var item2 = list.items[this.props.item.key - 1];
        var key1 = item1.key;
        var key2 = item2.key;
        
        item1.key = key2;
        item2.key = key1;

        list.items[key1] = item2;
        list.items[key2] = item1;
        for (var item of list.items)
            {delete item.id}

        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({
            items: list.items
        });
    }

    itemMoveDown = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        console.log("MOVING ITEM DOWN");

        if (this.props.item.key >= this.props.todoList.items.length - 1) // If item is at bottom of list
            {return;}

        var list = this.props.todoList;
        var item1 = list.items[this.props.item.key];
        var item2 = list.items[this.props.item.key + 1];
        var key1 = item1.key;
        var key2 = item2.key;

        item1.key = key2;
        item2.key = key1;

        list.items[key1] = item2;
        list.items[key2] = item1;
        for (var item of list.items)
            {delete item.id}

        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({
            items: list.items
        });
    }

    itemDelete = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        console.log("DELETING ITEM");

        let key = this.props.item.key;
        let newList = this.props.todoList;
        newList.items.splice(key, 1);
        newList.items.map(item => {
            if (item.key > key)
                {item.key -=1;}
        });

        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({
            items: newList.items
        });
    }
}
export default ItemCard;