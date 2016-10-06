import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import data from './data';
import 'bootstrap/dist/css/bootstrap.css';

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
                <div className="row">
                    <h4 className="col-md-4 col-md-offset-8">Checklist</h4>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {this.props.todoList.todos.map(todo => 
                            <TodoView todo={todo} key={todo.id} />
                        )}
                    </ul>
                    {this.props.todoList.unfinishedTodoCount == 0 ?
                    <span><h4>All tasks are complete!</h4>&nbsp;
                        <i className="glyphicon glyphicon-ok" style={{color: 'green', height: 20, width: 20}}></i>
                    </span>
                    :
                    <span><h3>Tasks left: {this.props.todoList.unfinishedTodoCount}</h3></span>
                    }
                    <br />
                    <button 
                        className="btn btn-primary" 
                        disabled={this.props.todoList.unfinishedTodoCount > 0}
                    >
                        Reset
                    </button>
                </div>
            </div>
        );
    }
}

const TodoView = observer(({todo}) =>     
    <li style={style} className="list-group-item">
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
            style={{width: 15, height: 15}}
        />&nbsp;{todo.finished ? 
        	<span className="text-muted" style={{backgroundColor: '#d3d3d3'}}>{todo.title}</span>
            : 
            <span>{todo.title}</span>
        }
    </li>
);

const store = new TodoList();

data.map((item) => store.todos.push(new Todo(item.title)));

const style = {
    listStyle: 'none'
};

ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('content'));
