import React from 'react';

const TodoItem = props =>{
    return (
        <div  style={{marginLeft : '155px'}}>
        <li style={{ marginTop: '10px'}}>{props.todo.name}</li>
        </div>
    )
}

export default TodoItem;