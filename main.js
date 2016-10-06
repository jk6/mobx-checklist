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
        this.reset();
    }
    reset (){
        this.finished = false;
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
    resetAllTheThings (){
        this.props.todoList.todos.map((todo) => todo.reset());
    }  
    render() {
        return (
            <div className="col-md-offset-2" style={appStyle}>
                <div className="row">
                    <div className="col-md-8">
                        {this.props.todoList.unfinishedTodoCount == 0 ?                    
                        <span><h3>All tasks are complete!&nbsp;<i className="glyphicon glyphicon-ok" style={{color: 'green', fontSize: 24}}></i></h3><hr /></span>                                                                            
                        :
                        <span><h3>Tasks left <span className="label label-default label-as-badge" style={{fontSize: 24}}>{this.props.todoList.unfinishedTodoCount}</span></h3><hr /></span>
                        }
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <ul className="list-group">
                            {this.props.todoList.todos.map(todo => 
                                <TodoView todo={todo} key={todo.id} />
                            )}
                        </ul>
                        
                        <br />
                        <button 
                            className="btn btn-primary btn-block" 
                            disabled={this.props.todoList.unfinishedTodoCount > 0}
                            onClick={this.resetAllTheThings.bind(this)}
                            style={{fontSize: 20}}
                            >                                               
                            Reset&nbsp;&nbsp;<i className="glyphicon glyphicon-refresh" style={{fontSize: 20}}></i>
                        </button>
                    </div>
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
            style={{width: 18, height: 18}}
        />&nbsp;&nbsp;{todo.finished ? 
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
const appStyle = {
    verticalAlign: 'middle'
};

ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('content'));
