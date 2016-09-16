import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

class Todo {
    id = Math.random();
    @observable title;
    @observable finished = false;
    constructor(title) {
        this.title = title;
    }
}

class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount () {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

@observer
class TodoListView extends Component {    
    render() {
        return (
            <div>
            <ul>
                {this.props.todoList.todos.map(todo => 
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            {this.props.todoList.unfinishedTodoCount == 0 ?
            <span><h3>All tasks are complete!</h3></span>
            :
            <span><h3>Tasks left: {this.props.todoList.unfinishedTodoCount}</h3></span>
            }
        </div>
        );
    }
}

const TodoView = observer(({todo}) => 
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.finished ? 
        		<span><strike>{todo.title}</strike></span>
            : 
            <span>{todo.title}</span>
        }
    </li>
);

const store = new TodoList();

store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code"),
    new Todo("Learn Mobx"),
    new Todo("Learn React Native")
);

ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));


//store.todos[0].finished = true;