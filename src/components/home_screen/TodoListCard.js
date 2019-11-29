import React from 'react';

class TodoListCard extends React.Component {

    render() {

        const { todoList } = this.props;
        // console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className= {"card-content grey-text text-darken-3 yellow lighten-2 hoverable"}>
                    <span className="card-title">{todoList.name}</span>
                    <p>{todoList.owner}</p>
                </div>
            </div>
        );
    }
}
export default TodoListCard;