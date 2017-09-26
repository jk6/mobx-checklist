import React from 'react';
import { observer } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.css';

const TodoView = observer(({ style, todo }) =>     
    <li style={styles.todos} className="list-group-item">
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
            style={{width: 18, height: 18}}
        />&nbsp;&nbsp;{todo.finished ? 
        	<span className="text-muted" style={{backgroundColor: '#d3d3d3'}}>{todo.title}</span>
            : 
            <span>{todo.title}</span>
        }
    </li>
);

const styles = {
    todos: {
        listStyle: 'none'
    }
};

export default TodoView;